var socket = io();
socket.on('message',function(data){
  console.log(data);
});

var canvasC = document.getElementById('canvasC');
var contextC = canvasC.getContext('2d');
canvasC.width = 800;
canvasC.height = 600;






socket.on('state',function(players){
  contextC.clearRect(0,0,800,600);
  contextC.fillStyle = 'green';


  for (var id in players){
    var player = players[id];
      contextC.beginPath();
      contextC.arc(player.x,player.y,10,0,2*Math.PI);
      contextC.fill();

  }
});



var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}

document.addEventListener('keydown',function(event){
  switch(event.keyCode){
    case 65: //A
      movement.left = true;
      break;
    case 87: //W
      movement.up = true;
      break;
    case 68: //D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
  }
});
document.addEventListener('keyup',function(event){
  switch (event.keyCode) {
    case 65:
      movement.left = false;
      break;
    case 87:
      movement.up = false;
      break;
    case 68:
      movement.right = false;
      break;
    case 83:
      movement.down = false;
      break;

  }

});

socket.emit('new player');
setInterval(function() {
  socket.emit('movement',movement);
},1000/60)
