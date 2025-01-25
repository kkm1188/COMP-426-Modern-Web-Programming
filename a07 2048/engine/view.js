import Game from "./game.js"

let game = new Game(4);

function addTiles(game){
  for(let i = 0; i< game.area; i++){
    if(game.gameState.board[i] == 0){
      $('#index' + i).empty();
    } else {
    $('#index' + i).append(`${game.gameState.board[i]}`);
    }
  }
}

function addScore(game){
  $('#score').append(`${game.gameState.score}`);

}
function checkWin(game){
  if(game.gameState.won == true){
      $('#message').empty();
      $('#message').append(`You Win!`)
  }
}
function checkOver(game){
  if(game.gameState.over == true){
      $('#message').empty();
      $('#message').append(`The game is over`)
  }
}

function restart(){
  const $root = $('#root');
  for(let i = 0; i< game.area; i++){
    $('#index' + i).empty();
  }

  $('#score').empty();
  $('#message').empty();
  $('#message').append(`You haven't won yet!`)
  game.setupNewGame();
  addTiles(game);
  addScore(game);
}


$(document).ready(() => {
    start();
    $('#main').on('click', '#restart', function() {
      (restart());
    })
});

function start() {

    const $root = $('#root');
    addTiles(game);
    addScore(game);
    checkWin(game);
    checkOver(game);
    
    document.onkeydown = function(e){
      switch(e.keyCode){
      case 37:
            game.move('left');
            
            for(let i = 0; i< game.area; i++){
              $('#index' + i).empty();
            }

            $('#score').empty();
            addScore(game);
            addTiles(game);
            checkWin(game);
            checkOver(game);
            break;
        case 38:
            game.move('up');
            for(let i = 0; i< game.area; i++){
              $('#index' + i).empty();
            }
            $('#score').empty();
            addTiles(game);
            addScore(game);
            checkWin(game);
            checkOver(game);
            break;
        case 39:
            game.move('right');
            for(let i = 0; i< game.area; i++){
              $('#index' + i).empty();
            }
            $('#score').empty();
            addTiles(game);
            addScore(game);
            checkWin(game);
            checkOver(game);
            break;
        case 40:
            game.move('down');
            for(let i = 0; i< game.area; i++){
              $('#index' + i).empty();
            }
            $('#score').empty();
            addTiles(game);
            addScore(game);
            checkWin(game);
            checkOver(game);
            break; 
      }
  }

  $root.html(game);
    
  }


  
