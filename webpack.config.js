var webpack = require('webpack');

module.exports = {

	context: __dirname + '/app',

	entry: {
		app : './app.js',
	},

	output: {
		path: __dirname + '/app/js',
		filename : 'app.bundle.js'
	},

	module:{
		loaders : [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.js$/, // include .js files 
                exclude: /node_modules/, // exclude any and all files in the node_modules folder 
                loader: "jshint-loader",
                        options: { 
                          camelcase: false,
                          emitErrors: false,
                          failOnHint: false
                        }
		}]
	}
}