//dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var portt = process.env.PORT || 5000;

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port',`${portt}`);
app.use('/static',express.static(__dirname + '/static'));

//routing
app.get('/',function(request,response){
  response.sendFile(path.join(__dirname,'index.html'));
});

//start the Server
server.listen(`${portt}`, function(){
  console.log('Starting server on port 5000');
});

var connectionQueue = [];
var count = 1;
var players = {};
io.on('connection',function(socket){
  socket.on("new player",function(){
    players[socket.id] = {
      x:100*count,
      y:100
    };
    count++;

});


  socket.on('movement',function(data){
    var player = players[socket.id] || {};
    if(data.left){
      player.x -= 5;
    }
    else if(data.up){
      player.y -= 5;
    }
    else if(data.right){
      player.x += 5;
    }
    else if(data.down){
      player.y += 5;
    }

      if(player.y > 595){
        player.y = 595;
      }
      else if(player.y < 5){
        player.y = 5;
      }
       if(player.x < 5){
        player.x = 5;
      }
      else if(player.x > 795){
        player.x = 795;
      }

  });
});

setInterval(function(){
  io.sockets.emit('state',players);
},1000/60);
