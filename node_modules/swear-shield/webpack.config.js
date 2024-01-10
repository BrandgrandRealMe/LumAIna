const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    module: {
        rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.json$/,
            loader: 'json-loader',
            type: 'javascript/auto'  // this line ensures webpack treats it as JavaScript
        }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
            library: 'lib',
            libraryTarget: 'umd',
            globalObject: 'this',
    },
};