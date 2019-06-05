// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
const app = express();
app.use('/', serveStatic(path.join(__dirname + "/dist")));
<<<<<<< HEAD
// var port = process.env.PORT || 5000;
var port = 80;
=======
var port = process.env.PORT || 3000;
>>>>>>> 12d60dd146fb2a8673e80b89d1d9c0952d913518
app.listen(port);
console.log('server started '+ port);