var express= require('express');
var app = express();
var server= require('http').createServer(app);
var io = require('socket.io').listen(server);

users=[];
connections = [];

server.listen(process.env.PORT || 3000);
console.log('Servidor Funcionando')

app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
	connections.push(socket);
	console.log('Conectados: %s sockets conectados', connections.length);

	connections.splice(cpnections.indexOf(socket),1);
	console.log('Disconnecte:%s sockets connected', connections.length);	
});