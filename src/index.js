import {Markdown} from './markdown'

var History = require("history")

function checkResponseStatus (response) {
  const location = History.location
  let status = response.status
  if (status === 401) {
    History.push({
      pathname: '/login',
      search: `?next=${location.pathname}`
    })
  } else if (status === 403) {

    History.push({
      pathname: '/login',
      search: `?next=${location.pathname}`
    })
  }
}


class SrvupAPI {
  constructor () {
    this.key = null
    this.apiEndpoint = 'https://api.srvup.com/v1'
    this.token = null
  }
  api = (key, apiEndpoint) => {
    this.key = key
    if (apiEndpoint !== undefined){
        this.apiEndpoint = 'https://api.srvup.com/v1'
    }
    
  }

  userToken = (token) => {
      this.token = token
  }

  login = (username, password, loginCallback) => {
    return this.post('/login/', {username: username, password:password}, loginCallback, false)
  }

  verityToken = (path, callback) => {
    const endpoint  = this.getEndpoint(path)
    const options   = this.getOptions('post', {"token": this.token}, false)
    const _this = this
    let status = 0
    fetch(endpoint, options)
    .then(function (response) {
        status = response.status
        return response.json()
      }).then(function (data) {
        if (status === 200) {
          _this.userToken(data['token'])
        } else {
          _this.userToken(null)
        }
        callback(data, status)
        return (data, status)
      })
      .catch(function (ex) {
        // alert('An unexpected error occured. Please try again')
        console.log('parsing failed', ex)
      })
  }

  verifyUser = (callback) => {
    return this.verityToken('/auth/verify/', callback)    
  }

  refreshUser = (callback) => {
    return this.verityToken('/auth/refresh/', callback)
  }

  getEndpoint = (path) => {
     return `${this.apiEndpoint}${path}`
  }

  getOptions = (method, data = {}, includeAuth = true) => {
    let lookupOptions = {
      headers: {
        'Content-Type': 'application/json',
        'x-srvup-signature': `${this.key}`
      },
      method: method

    }
    if (this.token && includeAuth) {
      lookupOptions['headers']['Authorization'] = `JWT ${this.token}`
    }
    if (Object.keys(data).length > 0) {
      lookupOptions['body'] = JSON.stringify(data)
    }
    return lookupOptions
  }

  get = (path, callback, includeAuth = true) => {
    const options = this.getOptions('get', {}, includeAuth)
    let status = 0
    let endpoint = path
    if (!path.includes(this.apiEndpoint)) {
       endpoint = this.getEndpoint(path)
    }
    fetch(endpoint, options)
      .then(function (response) {
        status = response.status
        checkResponseStatus(response)
        return response.json()
      }).then(function (data) {
        if (callback) {
          callback(data, status)
        }
      })
      .catch(function (ex) {
        // alert('An unexpected error occured. Please try again')
        console.log('parsing failed', ex)
      })
  }
  post = (path, data, callback, includeAuth = true) => {
    const options = this.getOptions('post', data, includeAuth)
    let status = 0
    let endpoint = this.getEndpoint(path)
    fetch(endpoint, options)
      .then(function (response) {
        status = response.status
        checkResponseStatus(response)
        return response.json()
      }).then(function (data) {
        if (callback) {
          callback(data, status)
        }
      })
      .catch(function (ex) {
        // alert('An unexpected error occured. Please try again')
        console.log('parsing failed', ex)
      })
  }
  put = (path, data, callback, includeAuth = true) => {
    const options = this.getOptions('put', data, includeAuth)
    let status = 0
    let endpoint = this.getEndpoint(path)
    fetch(endpoint, options)
      .then(function (response) {
        status = response.status
        checkResponseStatus(response)
        return response.json()
      }).then(function (data) {
        if (callback) {
          callback(data, status)
        }
      })
      .catch(function (ex) {
        // alert('An unexpected error occured. Please try again')
        console.log('parsing failed', ex)
      })
  }

  delete = (path, callback, includeAuth = true) => {
    const options = this.getOptions('delete', {}, includeAuth)
    let status = 0
    let endpoint = this.getEndpoint(path)
    fetch(this.endpoint, options)
      .then(function (response) {
        status = response.status
        checkResponseStatus(response)
        if (callback) {
          callback(response, status)
        }
        return response
      }).then(function (data) {
      })
      .catch(function (ex) {
        // alert('An unexpected error occured while deleting. Please try again')
        console.log('parsing failed', ex)
      })
  }

  comments(path, callback){
    return this.get(path, callback)
  }

  commentCreate(path, content, callback, parent=null){
    return this.post(path, {content: content, parent: parent}, callback)
  }
  


  posts = (callback, slug = null) => {
    let path = '/posts/'
    if (slug !== null) {
      path = `/posts/${slug}/`
    }
    return this.get(path, callback)
  }
  pages = (callback, slug = null) => {
    let path = '/pages/'
    if (slug !== null) {
      path = `/pages/${slug}/`
    }
    return this.get(path, callback)
  }
}

const Srvup = new SrvupAPI()
export {Markdown}
export default Srvup
