module.exports = {
	publicPath: '/',
	lintOnSave: process.env.NODE_ENV !== 'production',
	productionSourceMap: false,
	css: {
		sourceMap: process.env.NODE_ENV !== 'production',
	},
};