'use strict'
/*
 * index.js
 *
 * Armed Forces of Ukraine SSH-Client
 *
 */

var server = require('./server/app').server
var options = require('./server/app').config

server.listen({ host: options.listen.ip, port: options.listen.port
})

console.log('Armed Forces of Ukraine SSH-Client service listening ' + options.listen.ip + ':' + options.listen.port)

server.on('error', function (err) {
  if (err.code === 'EADDRINUSE') {
    options.listen.port++
    console.warn('Address in use, retrying on port ' + options.listen.port)
    setTimeout(function () {
      server.listen(options.listen.port)
    }, 250)
  } else {
    console.log('Armed Forces of Ukraine server.listen ERROR: ' + err.code)
  }
})
