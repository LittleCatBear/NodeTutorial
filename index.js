//1
var http = require('http'),
	express = require('express'),
	path = require('path');

var app =  express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('views', path.join(__dirname, 'views"')));

app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res){
	res.send('<html><body><h1> Salut express</h1></body></html>');
});



app.use(function(req, res){
	res.render('404', {url:req.url});
});

//2
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
