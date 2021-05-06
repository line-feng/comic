module.exports = {
	lintOnSave: false,
	publicPath: './',
	// publicPath: process.env.NODE_ENV === 'production' ? '/static' : '/',
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		extract: true,
		// 开启 CSS source maps?
		sourceMap: false,
		// css预设器配置项
		loaderOptions: {},
		// 启用 CSS modules for all css / pre-processor files.
		requireModuleExtension: true
	},
	assetsDir: 'static',
	parallel: false,
	devServer: {
		port: 9999 // 端口
	},
}
