const path = require('path');

module.exports = {
    mode: 'development',
    target: 'web',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'thingy.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 3000,
        publicPath: '/scripts/',
        watchContentBase: true,
        compress: true,
    }
};