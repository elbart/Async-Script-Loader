var http = require('http');
http.createServer(function (req, res) {
    setTimeout(function() {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.end('alert("huhu pete")');
    }, 20000)
}).listen(8124, "127.0.0.1");
//console.log('Server running at http://127.0.0.1:8124/');
