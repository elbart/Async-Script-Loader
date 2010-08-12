var http = require('http');
http.createServer(function (req, res) {
    setTimeout(function() {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.end('console.log("loading of potentially external script done...");');
    }, 5000)
}).listen(8124, "localhost");
