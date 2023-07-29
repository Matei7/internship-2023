const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const config = {
	entry: {
		index: './src/js/index.js',
		product_index: './src/js/product/product_index.js',
		cart_page_index: './src/js/cart_page_script.js',
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
