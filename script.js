const Gameboard = (()=>{
    let gameBoard = ["","","","","","","","",""];
    const restart = document.querySelector('#restart');
    const boardBoxes = document.querySelectorAll('.game-board div')
    let currentPlayer = null;
    const winningMessage = document.querySelector('.winining-message');


    const displayController = () =>{
        currentPlayer = player1;
        boardBoxes.forEach(function(boardBox, index){
            boardBox.addEventListener('click', function(){
                if(gameBoard[index] === ""){
                    gameBoard[index] = currentPlayer.mark;
                    boardBox.textContent = currentPlayer.mark;
                    console.log(gameBoard);
                    winCondition();
                    switchPlayer();
                }
            })
        })
    }

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const restartGame = function(){
        gameBoard = ["","","","","","","","",""];
        boardBoxes.forEach(button =>{
            button.textContent = ""
        })
    }

    const winMsg = function(){
        winningMessage.classList.add('show');
        winningMessage.textContent = currentPlayer.win();
        setTimeout(() =>{
            winningMessage.classList.remove('show')
        },2000)
    }


    const drawMsg = function (){
        winningMessage.classList.add('show');
        winningMessage.textContent = currentPlayer.draw();
        setTimeout(()=>{
            winningMessage.remove('show')
        },2000)
    }

    const winCondition = function(){
        if (
            (currentPlayer.mark === gameBoard[0] && currentPlayer.mark === gameBoard[1] && currentPlayer.mark === gameBoard[2]) ||
            (currentPlayer.mark === gameBoard[3] && currentPlayer.mark === gameBoard[4] && currentPlayer.mark === gameBoard[5]) ||
            (currentPlayer.mark === gameBoard[6] && currentPlayer.mark === gameBoard[7] && currentPlayer.mark === gameBoard[8]) ||
            (currentPlayer.mark === gameBoard[1] && currentPlayer.mark === gameBoard[4] && currentPlayer.mark === gameBoard[7]) ||
            (currentPlayer.mark === gameBoard[0] && currentPlayer.mark === gameBoard[3] && currentPlayer.mark === gameBoard[6]) ||
            (currentPlayer.mark === gameBoard[2] && currentPlayer.mark === gameBoard[5] && currentPlayer.mark === gameBoard[8]) ||
            (currentPlayer.mark === gameBoard[0] && currentPlayer.mark === gameBoard[4] && currentPlayer.mark === gameBoard[8]) ||
            (currentPlayer.mark === gameBoard[2] && currentPlayer.mark === gameBoard[4] && currentPlayer.mark === gameBoard[6])
          ) {
            winMsg()
            restartGame()
          }else if(gameBoard.every(position => position !== "")){
            drawMsg()
            restartGame()
          }
        };
    

    restart.addEventListener('click', () =>{
        restartGame()
    })
    return{
        displayController,
    }
})();


const playerProto = {
    win(){
        return `${this.name} wins the game`
    },
    draw(){
        return 'Draw'
    }
};

function createdPlayer(name,mark){
    const player = Object.create(playerProto);
    player.name = name;
    player.mark = mark;
    return player;
}
const player1 = createdPlayer('Player1', 'X');
const player2 = createdPlayer('Player2', 'O');
const logs = Gameboard.displayController();












