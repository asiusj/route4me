import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import copyWebpackPlugin from 'copy-webpack-plugin';

const config = {
	entry: './src/index.js',
	output: {
		path: path.resolve(process.cwd(), './dist'),
	},
	devServer: {
		contentBase: path.join(process.cwd(), 'dist'),
		compress: true,
		port: 8080,
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new copyWebpackPlugin({
			patterns: [
				{
					from: './src/images',
					to: 'images',
				},
			],
		}),
	],
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
					},
					{
						loader: 'sass-loader',
					},
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts',
						},
					},
				],
			},
		],
	},
};
export default config;
