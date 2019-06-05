module.exports = {
    devServer: {
        port: 8800,
        open: true,
        hotOnly: true,
        proxy: {
            '/api': {
                target: 'http://localhost:9800/api',
                ws: false,
                changeOrigin: true
            }
        }
    }
}