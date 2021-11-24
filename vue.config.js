module.exports = {

    // 配置跨域请求
    devServer: {
        port: 8080,
        host: 'localhost',
        open: true,
        https: false,
        proxy: {
            '/api': {
                target: 'http://1.117.164.153:8888/',
                // target: 'http://localhost:8888/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },

    chainWebpack: config => {
        config.module
            .rule('css')
            .test(/\.css$/)
            .oneOf('vue')
            .resourceQuery(/\?vue/)
            .use('px2rem')
            .loader('px2rem-loader')
            .options({ remUnit: 192 })
            .end()
    }

}
