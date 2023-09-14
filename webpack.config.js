const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = (env) => {
  let entryFile = './src/socket/index.ts';
  let outputFile = 'src/socket/index.js';
  switch (env.type) {
    case 'nest-api':
      entryFile = './src/main.ts';
      outputFile = 'src/main.js';
      break;
    case 'lambda-api':
      entryFile = './src/lambda.ts';
      outputFile = 'src/lambda.js';
      break;
    case 'import-uke-proccess':
      entryFile = './src/import-uke-proccess.ts';
      outputFile = 'src/import-uke-proccess.js';
      break;
  
    default:
      entryFile = './src/socket/index.ts';
      outputFile = 'src/socket/index.js';
      break;
  }
  
  console.log(entryFile, outputFile);
  return {
    entry: ['webpack/hot/poll?100', entryFile],
    target: 'node',
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    mode: 'development',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new RunScriptWebpackPlugin({
        name: outputFile,
        autoRestart: true,
      }),
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: outputFile,
      libraryTarget: 'commonjs2',
    },
  };
};
