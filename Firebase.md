# Firebase

### 練習來源
* https://github.com/firebase/quickstart-js
* https://github.com/firebase/functions-samples
* https://github.com/firebase/firebase-tools

### 實作執行
* https://github.com/Shyam-Chen/Frontend-Starter-Kit

***

### 目錄
* [Application (應用程式)](#應用程式)
* [Authentication (驗證)](#驗證)
  * [匿名](#匿名)
  * Email/Password
  * [Google](#google)
  * Facebook
  * Twitter
  * GitHub
* [Database (資料庫)](#資料庫)
  * [新增](#新增)
  * [讀取](#讀取)
  * [刪除](#刪除)
  * [更新](#更新)
  * 完整 CRUD
* [Storage (存儲)](#存儲)
  * [檔案上傳](#檔案上傳)
  * 多個檔案上傳
* [Functions (功能)](#功能)
  * FCM 通知
  * Email
  * SMS
  * Prerender
  * GitHub/Slack
  * PayPal
  * Chatbot
* [Hosting (託管)](#託管)

***

## 應用程式

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

## 驗證

### 匿名

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
const comment = document.querySelector('#comment');
const send = document.querySelector('#send');

firebase.auth()
  .onAuthStateChanged(user => {
    if (user) {
      send.onclick = () => {
        if (name.value !== '' && email.value !== '' && comment.value !== '') {
          firebase.database()
            .ref('users')
            .push({ id: user.uid, name: name.value, email: email.value, message: comment.value });

          name.value = '';
          email.value = '';
          comment.value = '';
        }
      };
    } else {
      firebase.auth().signInAnonymously();
    }
  });
```

後續底下操作都需要在匿名驗證下執行，也可以直接將規則 `auth != null` 設定為 `true`

### Google

```js
// TODO: 重寫
const signInButton = document.querySelector('#sign-in-button');
const signOutButton = document.querySelector('#sign-out-button');
const signInContent = document.querySelector('#sign-in-content');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const comment = document.querySelector('#comment');
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
      if (comment.value !== '') {
        postData(user.uid, user.displayName, user.email, comment.value);
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
          <textarea class="mdl-textfield__input" type="text" rows= "3" id="comment"></textarea>
          <label class="mdl-textfield__label" for="comment">${ COMMENT }</label>
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

## 資料庫

取得資料庫位址

```js
firebase.database()
  .ref('foo/bar');

// 等同於

firebase.database()
  .ref()
  .child('foo/bar');

// 等同於

firebase.database()
  .ref('https://<DATABASE_NAME>.firebaseio.com/foo/bar');
```

***

重新連接到伺服器，並將離線資料庫狀態與伺服器狀態同步

```js
firebase.database().goOnline();
```

斷開與伺服器的連接 (所有資料庫操作都將離線完成)

```js
firebase.database().goOffline();
```

***

```js
{
  "name": {
    "first": "Shyam",
    "last": "Chen"
  }
}

const fooBarRef = firebase.database().ref('foo/bar');

fooBarRef.once('value')
  .then(snapshot => {
    snapshot.key;  // "bar"
    snapshot.child('name/first').key;  // "first"
    snapshot.child('name/last').key;  // "last"
  });
```

***

```js

```

### 新增

```js
firebase.database()
  .ref('text')
  .set({ text: '123' });
```

```js
firebase.database()
  .ref('text')
  .push({ text: '123' });
```

```js
const postData = (userId, name, email, comment) => {
  firebase.database()
    .ref(`users/${userId}`)
    .set({ name, email, comment });
};

postData(user.uid, user.displayName, user.email, comment.value);
```

```js
const postData = (userId, name, email, comment) => {
  firebase.database()
    .ref(`users/${userId}`)
    .push({ name, email, comment });
};

postData(user.uid, user.displayName, user.email, comment.value);
```

`set` 會覆蓋既有的資料，而 `push` 不會

### 讀取

```js
const text = document.querySelector('#text');

firebase.database()
  .ref('text')
  .on('value', snapshot => {
    text.innerHTML = snapshot.val();
  });

// 只讀取一次

firebase.database()
  .ref('text')
  .once('value', snapshot => {
    text.innerHTML = snapshot.val();
  });
```

### 刪除

```js
firebase.database()
  .ref('text')
  .remove();
```

### 更新

```js
firebase.database()
  .ref()
  .update({ text: 'ABC' })
```

## 存儲

### 檔案上傳

```html
<input type="file" id="file-upload">
```

```js
const fileUpload = document.querySelector('#file-upload');

fileUpload.onchange = () => {
  firebase.storage()
    .ref()
    .child(`images/${fileUpload.files[0].name}`)
    .put(fileUpload.files[0], { contentType: fileUpload.files[0].type });
};
```

## 訊息

## 功能

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

## 託管

```bash
$ npm i firebase-tools -g
```

```bash
$ firebase deploy
```
