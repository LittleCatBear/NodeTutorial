//1
var http = require('http');

//2
http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end('<html><body><h1>Salut</h1></body></html>');

}).listen(3000);

console.log('server running on port 3000');