const path = require('path');
const nodeExternals = require('webpack-node-externals');

const paths = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
};

module.exports = {
  context: paths.src,
  entry: {
    server: './server.ts',
  },
  externals: [nodeExternals()],
  output: {
    filename: '[name].js',
    path: paths.dist,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
  target: 'node',
};
