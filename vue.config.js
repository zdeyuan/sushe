module.exports = {
	publicPath:'./',
	runtimeCompiler: true,
	chainWebpack: config => {
		config
			.plugin('html')
			.tap(args => {
				 args[0].title = process.env.VUE_APP_SYSTEM_WEB_TABEL_NAME || '';
				return args
			})
	}
}
