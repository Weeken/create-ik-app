const publicPaths = {
  development: '/',
  production: '/'
}
module.exports = {
  publicPath: publicPaths[process.env.NODE_ENV]
}
