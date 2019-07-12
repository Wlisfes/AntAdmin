const path = require('path')

const resolve = (dir) => path.join(__dirname, dir)
function recursiveIssuer(m) {
    if (m.issuer) {
      return recursiveIssuer(m.issuer);
    } else if (m.name) {
      return m.name;
    } else {
      return false;
    }
}

module.exports = {
    chainWebpack: (config) => {
        const splitOptions = config.optimization.get('splitChunks')
        splitOptions.cacheGroups.appStyles = {
            name: 'styles',
            test: (m, c, entry = 'app') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
            chunks: 'all',
            minChunks: 1,
            enforce: true
        }
        config.optimization.splitChunks(splitOptions)
        // // 移除 prefetch 插件
        config.plugins.delete("prefetch");
        // // 移除 preload 插件
        config.plugins.delete('preload');
        // // 压缩代码
        config.optimization.minimize(true);
        // // 分割代码
        config.optimization.splitChunks({
            chunks: 'all'
        })
        config.resolve.alias
            .set('@', resolve('src'))
    },
    productionSourceMap: false,
    devServer: {
        port: 8800,
        proxy: {
            '/api': {
                target: 'http://localhost:9800',
                // target: 'http://admin.lisfes.cn',
                ws: false,
                changeOrigin: true
            }
        }
    }
}