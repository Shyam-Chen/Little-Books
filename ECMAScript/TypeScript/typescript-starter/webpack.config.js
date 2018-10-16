const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

const SOURCE_ROOT = path.join(__dirname, 'src');
const DISTRIBUTION_ROOT = path.join(__dirname, 'dist');

module.exports = ({ prod = false } = {}) => ({
  mode: prod ? 'production' : 'development',
  context: SOURCE_ROOT,
  entry: {
    index: './index.ts',
  },
  output: {
    path: DISTRIBUTION_ROOT,
    filename: '[name].js',
  },
  module: {
    rules: [
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '~': path.join(SOURCE_ROOT, 'shell'),
    },
  },
  plugins: [
    new NodemonPlugin(),
  ],
  devtool: prod ? 'hidden-source-map' : 'cheap-module-eval-source-map',
});
