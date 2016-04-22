var path = require('path')

module.exports = {
  entry: './client/entry.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname, 
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
