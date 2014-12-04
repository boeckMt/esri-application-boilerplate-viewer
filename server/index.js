'use strict';

var ns = require('node-static');
var http = require('http');
var file = new ns.Server('../app');
var port = 9000;

http.createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(port);
console.log("server listen on port: " + port)
