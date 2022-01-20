import Fetch from './Fetch'

const myFetch = new Fetch({
  headers: {
    token: 'your token'
  },
  requestInterceptors(config) {
    if (!config.headers.token) {
      console.log('no token')
    }
    return config
  }
})

export default myFetch
