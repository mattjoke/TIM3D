/* eslint-disable */
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.hbs$/i,
        loader: 'handlebars-loader',
        options: {
          knownHelpersOnly: false
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.html', '.hbs', '.svg'],
    fallback: {
      fs: false
    },
    plugins: [new TsconfigPathsPlugin()]
  },
  output: {
    filename: 'tim3d.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'umd'
    }
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    port: 3000,
    compress: true,
    hot: true
  }
};
