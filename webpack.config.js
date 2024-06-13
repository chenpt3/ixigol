const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';
const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new ForkTsCheckerWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.([jt])sx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.(mp3|wav|ogg)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[path][name].[ext]'
                    }
                  }
                ],
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        config.plugins.push(new MiniCssExtractPlugin());
    } else {
        config.mode = 'development';
    }
    return config;
};