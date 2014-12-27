//1
var http = require('http'),
	express = require('express'),
	path = require('path');

var bodyParser = require('body-parser');

MongoClient = require('mongodb').MongoClient,
Server = require('mongodb').Server,
CollectionDriver = require('./CollectionDriver').CollectionDriver;

var app =  express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');

app.use(express.bodyParser());
app.use(express.static('views', path.join(__dirname, 'views"')));


app.use(function(req, res){
	res.render('404', {url:req.url});
});
var mongoHost = 'localHost';
var mongoPort = 27017;
var CollectionDriver;

var mongoClient = new MongoClient(new Server(mongoHost, mongoPort));
mongoClient.open(function(err, mongoClient){
	if(!mongoClient){
		console.error("error! existing...must start mongoDB fisrt");
		process.exit(1);
	}
	var db = mongoClient.db("MyDatabase");
	collectionDriver = new CollectionDriver(db);
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res){
	res.render('404', {url:req.url});
});
/*
app.get('/', function (req, res){
	res.send('<html><body><h1> Salut express</h1></body></html>');
});
*/
app.get('/:collection', function(req, res){
	var params = req.params;
	collectionDriver.findAll(req.params.collection, function(error, objs){
		if(error){
			res.send(400, error);
		}
		else{
			if(req.accepts('html')){
				res.render('data', {objects:objs, collection:req.params.collection});
			} else{
				res.set('Content-Type', 'application/json');
				res.send(200, objs);
			}
		}
	});
});

app.get('/:collection/:entity', function(req, res){
	var params = req.params;
	var entity = params.entity;
	var collection = params.collection;
	if(entity){
		collectionDriver.get(collection, entity, function(error, objs){
			if(error){ res.send(40, error);}
				else{ res.send(200, objs);}
		});
	} else{
		res.send(400, {error: 'bad url', url:req.url});
	}
});

app.post('/:collection', function(req, res){
	var object = req.body;
	var collection = req.params.collection;
	collectionDriver.save(collection, object, function(err, docs){
		if(err){ res.send(400, err);}
		else{ res.send(201, docs);}
	});
});

//2
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
