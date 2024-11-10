const path = require('path');

module.exports = {
	mode: 'production',
	output: {
	  path: path.resolve(__dirname, '../build'), 
	  filename: 'static/scripts/[name].[contenthash].js',
	  publicPath: '/react-burger/', 
	  clean: true, 
	},
};