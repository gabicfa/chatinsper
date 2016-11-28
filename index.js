var express = require('express');
var app = express();

var http = require('http').Server(app);

var io = require('socket.io')(http);

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


app.post('/sala', urlencodedParser, function (req, res) {
   response = {
      nickname:req.body.nickname,
   };
   console.log(response);
   res.sendFile(__dirname + '/sala.html');
})

app.get('/sala', function (req, res) {
   response = {
      nickname:req.query.nickname,
   };
   console.log(response);
   res.end(JSON.stringify(response));
})


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});