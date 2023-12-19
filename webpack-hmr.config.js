require('dotenv').config()
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

const isProduction =
  typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'prod';

const isNpmStart = typeof process.env.npm_lifecycle_event !== 'undefined' && process.env.npm_lifecycle_event.startsWith('start');

module.exports = function (options, webpack) {
  let plugins = [
    ...options.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin({
      paths: [/\.js$/, /\.d\.ts$/]
    })
  ];

  if (isNpmStart) {
    plugins.push(new RunScriptWebpackPlugin({ name: options.output.filename, autoRestart: false }));
  }

  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100']
      })
    ],
    plugins
  };
};
