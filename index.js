//1
var http = require('http'),
	express = require('express'),
	path = require('path');

var app =  express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res){
	res.send('<html><body><h1> Salut express</h1></body></html>');
});

app.get('/:a?/:b?/:c?', function(req, res){
	res.send(req.params.a+' '+req.params.b+' '+req.params.c);
});

//2
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port '+app.get('port'));
});

console.log('server running on port 3000');