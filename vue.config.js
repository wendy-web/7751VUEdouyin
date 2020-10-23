const path = require('path')
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    productionSourceMap: false,
    // assetsDir:'static',
    devServer: {
        // host: '172.16.17.95',
        host: 'localhost',
        open: true,
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://7751.iiio.top/',
                changeOrigin: true, //解决跨域
                logLevel: 'debug',
                // headers: {
                //     Cookie: ''
                // },
                pathRewrite: { //重定向
                    '^/api': '/'
                }
            }
        },
    },

    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        remUnit: 37.5
                    })
                ]
            }
        }
    },
}