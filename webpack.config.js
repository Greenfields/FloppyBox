const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const node_dir = __dirname + '/node_modules';

const commonLoaders = [
    {
        test: /\.js$/,
        loader: 'babel-loader'
    },
    {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader?browsers=last 5 versions!sass-loader')
    },
    {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'url-loader?limit=100000'
    }
];

module.exports = [
    {
        // The configuration for the client
        name: 'client-side rendering',
        context: path.join(__dirname),
        entry: './components/client.js',

        output: {
            filename: 'app.js',
            path: path.join(__dirname, 'dist/public')
        },
        module: {
            loaders: commonLoaders
        },
        plugins: [
            new ExtractTextPlugin('bundle.css', {allChunks: true}),
            new webpack.DefinePlugin({
                'process.env':{
                    'NODE_ENV': JSON.stringify('production')
                }
            })
        ]
    },
    {
        // The configuration for the server-side rendering
        name: 'server-side rendering',
        entry: './index.js',
        target: 'node',
        output: {
            path: './dist',
            publicPath: './public',
            filename: 'server.generated.js',
            libraryTarget: 'commonjs2'
        },
        node: {
            console: false,
            global: false,
            process: false,
            Buffer: false,
            __filename: false,
            __dirname: false
        },
        externals: /^[a-z\-0-9]+$/,
        module: {
            noParse: [
                node_dir + '/react/react.min.js',
                node_dir + '/react/react-dom.min.js'
            ],
            loaders: commonLoaders
        },
        plugins: [
            new ExtractTextPlugin('[name].css')
        ]
    }
];
