const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const config = {
	entry: {
		index: './src/js/index.js',
		"product-carousel" : './src/js/product-carousel.js'
	},
	output: {
		path: path.resolve( __dirname, 'dist' ),
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},

		]
	},
	plugins: [
		new MiniCssExtractPlugin()
	]
};

module.exports = config;
