var httpServer = require('./server/http');




var server = httpServer.listen(8080, function () {
    console.log('HTTP server started...');});