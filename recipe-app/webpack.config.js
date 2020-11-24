const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/recipes-app.js',
  devtool: 'source-map',
  output: {
    filename: 'recipes-app.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] },
        }
      }
    ],
  },
};
