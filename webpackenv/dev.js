const path = require('path')
const webpack = require('webpack');
const util = require('util');

module.exports = function (env) {
    return {
        entry: {
            app: './app/app.jsx'
        },
        plugins: [
            new webpack.ProvidePlugin({
                '$': 'jquery',
                'jQuery': 'jquery'
            }),

        ],
        output: {
            path: path.resolve(__dirname,'.././public/'),
            filename: 'bundle.js'
        },
        resolve: {
            alias: {

                // Libraries
                // JqueryValidate: path.resolve(__dirname,'.././app/js/jquery.validate.min.js'),
                Materialize: path.resolve(__dirname,'.././app/js/materialize.min.js'),

                // Components
                Main: path.resolve(__dirname,'.././app/components/Main.jsx'),
                Navbar: path.resolve(__dirname,'.././app/components/Navbar.jsx'),
                PubsPanel: path.resolve(__dirname,'.././app/components/PubsPanel.jsx'),
                PubCard: path.resolve(__dirname,'.././app/components/PubCard.jsx'),
                DrinksPanel: path.resolve(__dirname,'.././app/components/DrinksPanel.jsx'),
                DrinksCategory: path.resolve(__dirname,'.././app/components/DrinksCategory.jsx'),
                Drink: path.resolve(__dirname,'.././app/components/Drink.jsx'),
                DisplayOrder: path.resolve(__dirname,'.././app/components/DisplayOrder.jsx'),



                // JS
                DataAPI: path.resolve(__dirname,'.././app/components/DataAPI.js'),                

            },
            extensions: ['.js', '.jsx', '.json']
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                          presets: ['react', 'es2015', 'stage-3'],
                        }
                    }],
                },
         
            // Loaders for other file types can go here

            // load materialize fonts
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [{
                    loader: 'url-loader?limit=800000!name=public/fonts/roboto/[name].[ext]',
                }],      
            }
          ]
        },

        devtool: 'cheap-module-eval-source-map'       // for deployment - faster building
    }
};