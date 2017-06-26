# Firebase

### 練習來源

* https://github.com/firebase/quickstart-js
* https://github.com/firebase/functions-samples
* https://github.com/firebase/firebase-tools

### 實作執行

* https://github.com/Shyam-Chen/Web-Starter-Kit

***

### 目錄
* [Application (應用程式)](#應用程式)
* [Authentication (驗證)](#驗證)
  * [匿名](#匿名)
  * [Email/Password](#email-password)
  * [Google](#google)
  * Facebook
  * Twitter
  * GitHub
* [Realtime Database (資料庫)](#資料庫)
  * [新增](#新增)
  * [讀取](#讀取)
  * [刪除](#刪除)
  * [更新](#更新)
  * [完整 CRUD](#完整-crud)
  * 整合 Web Storage API
* [Storage (存儲)](#存儲)
  * [檔案上傳](#檔案上傳)
  * 整合 File API
  * 多個檔案上傳
* Cloud Messaging (訊息)
  * Notification message
  * Data message
* [Cloud Functions (函式)](#函式)
  * 核心
    * Realtime Database Triggers (資料庫觸發器)
    * Authentication Triggers (驗證觸發器)
    * Google Analytics Triggers (GA 觸發器)
    * Cloud Storage Triggers (Google Cloud 存儲觸發器)
    * Cloud Pub/Sub Triggers (Google 發佈/訂閱觸發器)
    * HTTP Triggers (HTTP 觸發器)
  * FCM 通知
  * Email
  * SMS
  * Prerender
  * 匯出 Excel
  * GitHub/Slack
  * PayPal
  * Chatbot
* [Hosting (託管)](#託管)
  * Custom Domain (自訂網域)

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

後續底下操作都需要在匿名驗證下執行，也可以直接將規則 `auth != null` 設定為 `true`

### Email/Password

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
const postData = (userId, name, email, message) => {
  firebase.database()
    .ref(`users/${userId}`)
    .set({ name, email, message });
};

postData(user.uid, user.displayName, user.email, message.value);
```

```js
const postData = (userId, name, email, message) => {
  firebase.database()
    .ref(`users/${userId}`)
    .push({ name, email, message });
};

postData(user.uid, user.displayName, user.email, message.value);
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
  .update({ text: 'ABC' });
```

### 完整 CRUD

```html
<div id="users"></div>
```

```js
import { template as _ } from 'lodash';

firebase.database()
  .ref('users')
  .on('value', snapshot => {
    document.querySelector('#users')
      .innerHTML = _(usersTemplate, { imports: { snapshot } })();

    users();
  });
```

```html
<div class="mdc-layout-grid">
  <table id="users-table" class="md-table">
    <thead>
      <tr>
        <th colspan="4">
          <div class="mdc-textfield">
            <input type="text" id="create-name" class="mdc-textfield__input">
            <label for="create-name" class="mdc-textfield__label">Name</label>
          </div>
          <div class="mdc-textfield">
            <input type="text" id="create-email" class="mdc-textfield__input">
            <label for="create-email" class="mdc-textfield__label">Email</label>
          </div>
          <div class="mdc-textfield">
            <input type="text" id="create-message" class="mdc-textfield__input">
            <label for="create-message" class="mdc-textfield__label">Message</label>
          </div>
          <button type="button" id="create" class="mdc-button">Add</button>
        </th>
      </tr>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Message</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <% snapshot.forEach(function(childSnapshot) { %>
        <tr>
          <td><%- childSnapshot.val().name %></td>
          <td><%- childSnapshot.val().email %></td>
          <td><%- childSnapshot.val().message %></td>
          <td>
            <button type="button" class="mdc-button mdc-button--primary"
              data-edit="<%- childSnapshot.key %>"
              data-edit-name="<%- childSnapshot.val().name %>"
              data-edit-email="<%- childSnapshot.val().email %>"
              data-edit-message="<%- childSnapshot.val().message %>"
            >Edit</button>
            <button type="button" class="mdc-button mdc-button--primary" data-delete="<%- childSnapshot.key %>">Delete</button>
          </td>
        </tr>
      <% }); %>
    </tbody>
  </table>
</div>

<aside id="dialog-edit" class="mdc-dialog">
  <div class="mdc-dialog__surface">
    <header class="mdc-dialog__header">
      <h2 class="mdc-dialog__header__title">Edit</h2>
    </header>
    <section class="mdc-dialog__body">
      <div class="mdc-layout-grid">
        <div class="mdc-layout-grid__inner">
          <div class="mdc-layout-grid__cell">
            <div class="mdc-textfield">
              <label class="mdc-textfield__label" for="name">Name</label>
              <input type="text" class="mdc-textfield__input" id="edit-name" value=" ">
            </div>

            <div class="mdc-textfield">
              <label class="mdc-textfield__label" for="email">Email</label>
              <input type="text" class="mdc-textfield__input" id="edit-email" value=" ">
            </div>

            <div class="mdc-textfield">
              <label class="mdc-textfield__label" for="message">Message</label>
              <input type="text" class="mdc-textfield__input" id="edit-message" value=" ">
            </div>
          </div>
        </div>
      </div>


    </section>
    <footer class="mdc-dialog__footer">
      <button type="button" class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel">Cancel</button>
      <button type="button" id="edit-save" class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--accept">Save</button>
    </footer>
  </div>
</aside>

<aside id="dialog-delete" class="mdc-dialog">
  <div class="mdc-dialog__surface">
    <header class="mdc-dialog__header">
      <h2 class="mdc-dialog__header__title">Delete</h2>
    </header>
    <section class="mdc-dialog__body">
      Are you sure you want to delete it?
    </section>
    <footer class="mdc-dialog__footer">
      <button type="button" class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel">Cancel</button>
      <button type="button" id="delete-confirm" class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--accept">Confirm</button>
    </footer>
  </div>
</aside>
```

```js
const bodyEl = document.querySelector('body');

const name = document.querySelector('#create-name');
const email = document.querySelector('#create-email');
const message = document.querySelector('#create-message');
const create = document.querySelector('#create');

const dialogEditEl = document.querySelector('#dialog-edit');
const dialogEdit = new mdDialog.MDCDialog(dialogEditEl);
const name = document.querySelector('#edit-name');
const email = document.querySelector('#edit-email');
const message = document.querySelector('#edit-message');
const save = document.querySelector('#edit-save');

const dialogDeleteEl = document.querySelector('#dialog-delete');
const dialogDelete = new mdDialog.MDCDialog(dialogDeleteEl);
const confirm = document.querySelector('#delete-confirm');

const sliceAll = (selector: string, element: HTMLElement = document): string[] =>
  [].slice.call((element).querySelectorAll(selector));

sliceAll('tbody').forEach((body: HTMLTableElement): void => {
  sliceAll('tr', body).reverse()
    .forEach(row => body.appendChild(row));
});

[dialogEdit, dialogDelete].forEach((dialog: any): void => {
  dialog.listen('MDCDialog:accept', () => bodyEl.style.overflowY = 'auto');
  dialog.listen('MDCDialog:cancel', () => bodyEl.style.overflowY = 'auto');
});

create.onclick = () => {
  firebase.database()
    .ref('users')
    .push({ name: name.value, email: email.value, message: message.value });
};

[].forEach.call(
  document.querySelectorAll('.mdc-button[data-edit]'),
  editButton => {
    editButton.onclick = (): void => {
      dialogEdit.show();
      bodyEl.style.overflowY = 'hidden';

      name.value = editButton.dataset.editName;
      email.value = editButton.dataset.editEmail;
      message.value = editButton.dataset.editMessage;

      save.onclick = (): void => {
        firebase.database()
          .ref(`users/${editButton.dataset.edit}`)
          .update({ name: name.value, email: email.value, message: message.value });
      };
    };
  }
);

[].forEach.call(
  document.querySelectorAll('.mdc-button[data-delete]'),
  deleteButton => {
    deleteButton.onclick = (): void => {
      dialogDelete.show();
      bodyEl.style.overflowY = 'hidden';

      confirm.onclick = (): void => {
        firebase.database()
          .ref(`users/${deleteButton.dataset.delete}`)
          .remove();
      };
    };
  }
);
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
    .put(fileUpload.files[0], { contentType: fileUpload.files[0].type })
    .then(snapshot => {
      console.log(snapshot.downloadURL);
    });
};
```

### 整合 File API

由於選完檔案直接上傳不是個好方法，所以我們需要運用 File API

## 訊息

## 函式

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
