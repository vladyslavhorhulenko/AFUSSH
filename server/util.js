'use strict'

// private
require('colors') 
var debug = require('debug')('WebSSH2')
var Auth = require('basic-auth')

exports.basicAuth = function basicAuth (req, res, next) {
  var myAuth = Auth(req)
  if (myAuth && myAuth.pass !== '') {
    req.session.username = myAuth.name
    req.session.userpassword = myAuth.pass
    debug('myAuth.name: ' + myAuth.name.yellow.bold.underline +
      ' and password ' + ((myAuth.pass) ? 'exists'.yellow.bold.underline
      : 'is blank'.underline.red.bold))
    next()
  } else {
    res.statusCode = 401
    debug('basicAuth credential request (401)')
    res.setHeader('WWW-Authenticate', 'Basic realm="WebSSH"')
    res.end('Username and password required for web SSH service.')
  }
}

exports.parseBool = function parseBool (str) {
  return (str.toLowerCase() === 'true')
}
