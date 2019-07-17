const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

const ENV = process.env.npm_lifecycle_event;
const isHot = ENV === 'dev';
const isProd = !isHot;

const config = {
    entry: './src/index.tsx',
    mode: isProd ? 'production' : 'development',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: isProd ? '[name].[chunkhash].js' : '[name].js',
        chunkFilename: isProd ? '[name].[chunkhash].js' : '[name].js',
    },
    bail: isProd,
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.mjs', '.js', '.json', '.ts', '.tsx'], // .mjs fixes https://github.com/graphql/graphql-js/issues/1272
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'awesome-typescript-loader',
                exclude: [ /node_modules/ ]
            },
            {
                test: /\.(less|css)$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            // {
            //     test: /\.(png|jpg|jpeg|svg)$/,
            //     loader: 'url-loader',
            //     query: {
            //         // limit: 8192,
            //         name: 'assets/images/[name].[ext]'
            //     }
            // },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                query: {
                    mimetype: 'application/font-woff',
                    name: 'assets/fonts/[name].[ext]'
                }
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                query: {
                    name: 'assets/fonts/[name].[ext]'
                }
            },
            {
                type: 'javascript/auto',
                test: /\.(png|jpg|svg|jpeg)$/,
                include: path.resolve(__dirname, 'assets', 'images'),
                loader: 'file-loader',
                query: {
                    name: 'assets/images/[name].[ext]'
                }
            },
            { // fixes https://github.com/graphql/graphql-js/issues/1272
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto",
            }
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        },
        minimizer: isProd ? [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            })
        ] : [],
    } ,
    plugins: [
        new CheckerPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            favicon: './assets/favicon.ico',
            inject: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    devServer: {
        proxy: {
            '/graphql': 'http://localhost:4000',
            '/static': 'http://localhost:4000'
        },
        publicPath: '/',
        historyApiFallback: true,
    }
};

module.exports = config;
