// Webpack uses this to work with directories
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require('stylelint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { url } = require('inspector');
const theme_module = '';

// This is the main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {
    // Default mode for Webpack is production.
    // Depending on mode Webpack will apply different things
    // on final bundle. For now we don't need production's JavaScript 
    // minifying and other thing so let's set mode to development
    mode: 'development',

    // Path to your entry point. From this file Webpack will begin his work
    entry: './src/javascript/index.js',

    // Path and filename of your result bundle.
    // Webpack will bundle all JavaScript into this file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    watch: false,
    module: {
        rules: [
            {
            test: /\.js$/,
            /* ... */
            },
            {
            // Apply rule for .sass, .scss or .css files
            test: /\.(sa|sc|c)ss$/,
        
            // Set loaders to transform files.
            // Loaders are applying from right to left(!)
            // The first loader will be applied after others
                use: [
                    {
                        // After all CSS loaders we use plugin to do his work.
                        // It gets all transformed CSS and extracts it into separate
                        // single bundled file
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ''
                        }
                    },
                    {
                    // This loader resolves url() and @imports inside CSS
                    loader: "css-loader"
                    },
                    {
                    // Then we apply postCSS fixes like autoprefixer and minifying
                    loader: "postcss-loader"
                    },
                    {
                    // First we transform SASS to standard CSS
                    loader: "sass-loader",
                    options: {
                        implementation: require("sass")
                    }
                    }
                ]
            },
            {
                // Now we apply rule for images
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        // Using file-loader for these files
                        loader: "file-loader",
        
                        // In options we can set different things like format
                        // and directory to save
                        options: {
                            name: `${theme_module}.[name].[ext]`,
                            outputPath: `/${theme_module}/img`
                        }
                    }
                    ]
            },
            {
                // Apply rule for fonts files
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [
                    {
                        // Using file-loader too
                        loader: "file-loader",
                        options: {
                            name: `[name].[ext]`,
                            outputPath: `/${theme_module}`
                        }
                    }
                    ]
            }
        ]
    },
    plugins: [

        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: "bundle.css"
        }),
        new StylelintPlugin({
            configFile: '.stylelintrc.json',
            context: 'src',
            files: '**/*.scss',
            failOnError: false,
            fix: true,
            quiet: false,
            emitErrors: true // by default this is to true to check the CSS lint errors
        }),
        new HtmlWebpackPlugin({ template: './index.html' })
      
      ],
      //devtool: 'inline-source-map',
      devServer: {
            contentBase: path.join(__dirname, 'dist'),
            disableHostCheck: true,
            hot: false,
            https: false,
            inline: false,
            liveReload: true,
            port: 3000,
            watchContentBase: true,
            writeToDisk: true
      }
};