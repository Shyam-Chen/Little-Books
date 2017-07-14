## 入門

### 環境配置

```bash
$ mkdir <專案名稱>
$ cd <專案名稱>
```

```bash
$ npm init -y
```

```bash
$ npm i react react-dom -S
```

```bash
$ npm i webpack webpack-dev-server babel-core babel-loader babel-preset-es2015 babel-preset-react babel-plugin-transform-runtime -D
```

```bash
$ touch webpack.config.js
```

```js
// webpack.config.js
const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: join(__dirname, 'src'),
  entry: {
    main: './main.js'
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devServer: {
    inline: true,
    port: 8000,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    })
  ]
};
```

```html
<!-- src/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>React GO</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

```js
// src/main.js
import React from 'react';
import ReactDOM from 'react-dom';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>React GO</h1>
      </div>
    );
  }
}

App.propTypes = {};

ReactDOM.render(
  <App />,
  document.querySelector('#app')
);
```

```js
// package.json
[...]
  "scripts": {
    "start": "webpack-dev-server --devtool eval --progress --colors --content-base build",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
[...]
```

```bash
$ npm start
```

http://localhost:8000/
