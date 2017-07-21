## 入門

### 生態系

### 環境配置

```bash
$ mkdir <專案名稱>
$ cd <專案名稱>
```

```bash
$ npm init -y
```

```bash
$ npm i react react-dom redux react-redux redux-thunk -S
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

const scss = require('postcss-scss');
const pimport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const rucksack = require('rucksack-css');
const url = require('postcss-url');
const cssnano = require('cssnano');

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
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react']
            }
          }
        ]
      }, {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              parser: scss,
              plugins: [
                pimport(),
                cssnext({ warnForDuplicates: false }),
                rucksack({ autoprefixer: true }),
                url(),
                cssnano()
              ]
            }
          }
        ]
      },
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
