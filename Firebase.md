# Firebase

### 練習來源
* https://github.com/firebase/quickstart-js

### 實作執行
* https://github.com/Shyam-Chen/Frontend-Starter-Kit

***

### 目錄
* Authentication (認證)
  * Email/Password
  * [Google](#google)
  * Facebook
  * Twitter
* Database (資料庫)
* Storage (存儲)
* Messaging (訊息)

***

## 認證

### Google

```js
const signInButton = document.querySelector('#sign-in-button');
const signOutButton = document.querySelector('#sign-out-button');
const content = document.querySelector('#content');

let currentUID;
const onAuthStateChanged = (user) => {
  if (user && currentUID === user.uid) return;

  if (user) {
    currentUID = user.uid;
    signInButton.style.display = 'none';
    content.style.display = '';
    signOutButton.style.display = '';
    document.querySelector('#username').value = `${user.displayName}`;
    document.querySelector('#useremail').value = `${user.email}`;
  } else {
    currentUID = null;
    signInButton.style.display = '';
  }
};

signInButton.onclick = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

signOutButton.onclick = () => {
  firebase.auth().signOut();
  content.style.display = 'none';
  signOutButton.style.display = 'none';
  signInButton.style.display = '';
};

firebase.auth().onAuthStateChanged(onAuthStateChanged);

content.style.display = 'none';
signOutButton.style.display = 'none';
signInButton.style.display = '';
```

```html
<div class="mdl-grid mdl-grid--center">
  <button id="sign-in-button" class="mdl-button--raised mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary">
    <i class="material-icons">account_circle</i> <%= ACCOUNT.SIGN_IN_BUTTON %>
  </button>

  <button id="sign-out-button" class="mdl-button--raised mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary">
    <i class="material-icons">account_circle</i> <%= ACCOUNT.SIGN_OUT_BUTTON %>
  </button>
</div>

<div id="content" class="mdl-grid mdl-grid--center">
  <div class="mdl-card mdl-shadow--2dp">
    <div class="mdl-card__supporting-text">
      <form action="#">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="text" id="username" value="Google Display Name" readonly>
          <label class="mdl-textfield__label" for="username"><%= NAME %></label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="text" id="useremail" value="Google Email" readonly>
          <label class="mdl-textfield__label" for="useremail"><%= EMAIL %></label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <textarea class="mdl-textfield__input" type="text" rows= "3" id="content-text"></textarea>
          <label class="mdl-textfield__label" for="content-text"><%= COMMENT %></label>
        </div>
        <div class="mdl-textfield">
          <div id="contact-image"></div>
        </div>
      </form>
    </div>
    <div class="mdl-card__actions mdl-card--border mdl-cell--right">
      <button class="mdl-button mdl-js-button mdl-js-ripple-effect">
        <%= SEND %> <i class="material-icons">send</i>
      </button>
    </div>
  </div>
</div>
```
