module.exports = {
	publicPath: '/',
	lintOnSave: process.env.NODE_ENV !== 'production',
	productionSourceMap: false,
	chainWebpack: (config) => {
		config.module.rule('mjs$').test(/\.mjs$/).include.add(/node_modules/).end().type('javascript/auto');
	},
	configureWebpack: {
		resolve: {
			extensions: ['*', '.mjs', '.js', '.vue', '.json'],
		},
	},
	css: {
		sourceMap: process.env.NODE_ENV !== 'production',
	},
};