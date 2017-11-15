# Firebase

### Reference Resources (參考資源)

* https://github.com/firebase/quickstart-js
* https://github.com/firebase/functions-samples
* https://github.com/firebase/firebase-tools

### Actual Operation (實作執行)

* https://github.com/Shyam-Chen/Frontend-Starter-Kit

***

### Table of Contents (目錄)

* [Authentication (憑證)](#authentication-憑證)
  * [Anonymous (匿名)](#anonymous-匿名)
  * [Email/Password (電子郵件/密碼)](#email-password-電子郵件-密碼)
  * [Google](#google)
  * [Facebook](#facebook)
  * [Twitter](#twitter)
* [Database (資料庫)](#database-資料庫)
* [Storage (存儲)](#storage-存儲)
  * [File upload (檔案上傳)](#file-upload-檔案上傳)
  * 整合 File API
  * 多個檔案上傳
* [Hosting (託管)](#hosting-託管)
  * Custom Domain (自訂網域)
* [Functions (函式)](#functions-函式)
  * Triggers (觸發器)
    * Cloud Firestore Triggers (資料庫觸發器)
    * Authentication Triggers (憑證觸發器)
    * Google Analytics Triggers (GA 觸發器)
    * Cloud Storage Triggers (Google 存儲觸發器)
    * Cloud Pub/Sub Triggers (Google 發佈/訂閱觸發器)
    * HTTP Triggers (HTTP 觸發器)
  * FCM 通知
  * Email
  * 授權
    * LINE
    * Instagram
  * SMS
  * 匯出 Excel
  * GitHub/Slack
  * Google Cloud
    * BigQuery
  * PayPal
  * Chatbot


***

初始化

```js
firebase.initializeApp({
  apiKey: '...',
  authDomain: '...',
  databaseURL: 'https://...',
  storageBucket: '...',
  messagingSenderId: '...'
});
```

## Authentication (憑證)

### Anonymous (匿名)

```html
<section>
  <div class="mdc-textfield">
    <input type="text" id="name" class="mdc-textfield__input">
    <label for="name" class="mdc-textfield__label">Name</label>
  </div>
  <div class="mdc-textfield">
    <input type="text" id="email" class="mdc-textfield__input">
    <label for="email" class="mdc-textfield__label">Email</label>
  </div>
  <div class="mdc-textfield mdc-textfield--multiline">
    <textarea id="message" class="mdc-textfield__input" rows="5"></textarea>
    <label for="message" class="mdc-textfield__label">Message</label>
  </div>
  <button type="button" aria-label="Send" id="send" class="mdc-button">Send</button>
</section>
```

```js
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const message = document.querySelector('#message');
const send = document.querySelector('#send');

const textfieldInputs = document.querySelectorAll('.mdc-textfield__input');
const empty = [].filter.call(textfieldInputs, textfieldInput => textfieldInput.value === '');

firebase.auth()
  .onAuthStateChanged(user => {
    if (user) {
      send.onclick = () => {
        if (!empty.length) {
          firebase.database()
            .ref('users')
            .push({ id: user.uid, name: name.value, email: email.value, message: message.value });

          [].forEach.call(
            textfieldInputs,
            textfieldInput => textfieldInput.value = ''
          );
        }
      };
    } else {
      firebase.auth().signInAnonymously();
    }
  });
```

後續底下操作都需要在匿名憑證下執行，也可以直接將規則 `auth != null` 設定為 `true`

### Email/Password (電子郵件/密碼)

登入

```js
const adminEmail = document.querySelector('#admin-email');
const adminPassword = document.querySelector('#admin-password');

const signOutContent = document.querySelectorAll('[data-sign-out]');
const signInContent = document.querySelectorAll('[data-sign-in]');

adminSignIn.onclick = () => {
  firebase.auth()
    .signInWithEmailAndPassword(adminEmail.value, adminPassword.value)
    .then(() => {
      adminEmail.value = '';
      adminPassword.value = ''
      adminEmailLabel.classList.remove('mdc-textfield__label--float-above');
      adminPasswordLabel.classList.remove('mdc-textfield__label--float-above');
    })
    .catch(error => {
      loginToast.show({ message: error.message });
    });
};
```

註冊

```js
firebase.auth()
  .createUserWithEmailAndPassword(email, password)
  .catch(error => {
    loginToast.show({ message: error.message });
  });
```

### Google

```js
// TODO: 重寫
const signInButton = document.querySelector('#sign-in-button');
const signOutButton = document.querySelector('#sign-out-button');
const signInContent = document.querySelector('#sign-in-content');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const message = document.querySelector('#message');
const send = document.querySelector('#send');

let currentUID;
const onAuthStateChanged = user => {
  if (user && currentUID === user.uid) return;

  if (user) {
    currentUID = user.uid;

    signInButton.style.display = 'none';
    signOutButton.style.display = '';
    signInContent.style.display = '';

    name.value = `${user.displayName}`;
    email.value = `${user.email}`;

    send.onclick = () => {
      if (message.value !== '') {
        postData(user.uid, user.displayName, user.email, message.value);
      }
    };
  } else {
    currentUID = null;

    signInButton.style.display = '';
  }
};

signInButton.onclick = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const unAuth = () => {
  signInButton.style.display = '';
  signOutButton.style.display = 'none';
  signInContent.style.display = 'none';
};

signOutButton.onclick = () => {
  firebase.auth().signOut();
  unAuth();
};

firebase.auth().onAuthStateChanged(onAuthStateChanged);
unAuth();
```

```html
<div class="mdl-grid mdl-grid--center">
  <button id="sign-in-button" class="mdl-button--raised mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary">
    <i class="material-icons">account_circle</i> ${ ACCOUNT.SIGN_IN_BUTTON }
  </button>

  <button id="sign-out-button" class="mdl-button--raised mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary">
    <i class="material-icons">account_circle</i> ${ ACCOUNT.SIGN_OUT_BUTTON }
  </button>
</div>

<div id="sign-in-content" class="mdl-grid mdl-grid--center">
  <div class="mdl-card mdl-shadow--2dp">
    <div class="mdl-card__supporting-text">
      <form>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="text" id="name" value="Google Display Name" readonly>
          <label class="mdl-textfield__label" for="name">${ NAME }</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="text" id="email" value="Google Email" readonly>
          <label class="mdl-textfield__label" for="email">${ EMAIL }</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <textarea class="mdl-textfield__input" type="text" rows= "3" id="message"></textarea>
          <label class="mdl-textfield__label" for="message">${ COMMENT }</label>
        </div>
      </form>
    </div>
    <div class="mdl-card__actions mdl-card--border mdl-cell--right">
      <button id="send-button" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
        ${ SEND } <i class="material-icons">send</i>
      </button>
    </div>
  </div>
</div>
```

### Facebook

### Twitter

## Database (資料庫)

## Storage (存儲)

### File upload (檔案上傳)

```html
<input type="file" id="file-upload">
```

```js
const fileUpload = document.querySelector('#file-upload');

fileUpload.onchange = () => {
  firebase.storage()
    .ref()
    .child(`images/${fileUpload.files[0].name}`)
    .put(fileUpload.files[0], { contentType: fileUpload.files[0].type })
    .then(snapshot => {
      console.log(snapshot.downloadURL);
    });
};
```

### 整合 File API

由於選完檔案直接上傳不是個好方法，所以我們需要運用 File API

## Functions (函式)

```js
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

/**
 * @example
 * https://us-central1-<PROJECT_ID>.cloudfunctions.net/addMessage?text=foo
 */
exports.addMessage = functions.https
  .onRequest(req => {
    const text = req.query.text;

    admin.database()
      .ref('/messages')
      .push({ text });
  });
```

### Google Cloud

#### BigQuery

```js
const functions = require('firebase-functions');
const bigquery = require('@google-cloud/bigquery')();

// TODO
```

## Hosting (託管)

```bash
$ npm i firebase-tools -g
```

```bash
$ firebase deploy
```
