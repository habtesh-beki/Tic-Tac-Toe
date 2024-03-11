const boxes = document.querySelectorAll('.box');
const winner = document.querySelector('.winner')
const restart = document.querySelector('.winner')
const winnerMessage = document.querySelector('.winnerMessage')
let player_x = 'X';
let player_o = 'O';
let currentPlayer = player_x;

const checkRow = function(player, rowIndex) {
  let start = rowIndex * 3;

  return (
    boxes[start].textContent == player &&
    boxes[start + 1].textContent == player &&
    boxes[start + 2].textContent == player
  );
};

const checkColumn = function(player, colIndex) {
  return (
    boxes[colIndex].textContent == player &&
    boxes[colIndex + 3].textContent == player &&
    boxes[colIndex + 6].textContent == player
  );
};

const checkDiagonal = function(player) {
  const forwardDiagonal =
    boxes[0].textContent == player &&
    boxes[4].textContent == player &&
    boxes[8].textContent == player;
  const reverseDiagonal =
    boxes[2].textContent == player &&
    boxes[4].textContent == player &&
    boxes[6].textContent == player;
  return forwardDiagonal || reverseDiagonal;
};
///////draw
const drawGame = function(){
  for(const box of boxes){
    if(box.textContent === ''){
      return false;
    }
  }
  return true;
}

const switchUser = function() {
  currentPlayer = currentPlayer === player_x ? player_o : player_x;
};

boxes.forEach((box, index) => {
  box.addEventListener('click', function() {
    let rowIndex = Math.floor(index / 3);
    let colIndex = index % 3;
    if (box.textContent !== '') {
      console.log('Invalid move. Box already filled.');
      return;
    }

    box.textContent = currentPlayer;


    if (
      checkRow(currentPlayer, rowIndex) ||
      checkColumn(currentPlayer, colIndex) ||
      checkDiagonal(currentPlayer)
    ) {

      const winnerPopup = `
     <h1 class="winner-popup">player ${currentPlayer} is winner 🥇😜😜</h1>
     `
     winnerMessage.insertAdjacentHTML('afterbegin', winnerPopup)
     winner.classList.remove('hidden')
    }
    else if(drawGame()){
      const winnerPopup = `
      <h1 class="winner-popup">there is no winner 😥😥</h1>
      `
      winnerMessage.insertAdjacentHTML('afterbegin', winnerPopup)
      winner.classList.remove('hidden')
    }
  else {
     switchUser();
  }
   
  });
});
const restartGame = function(){
  boxes.forEach(box => {
    box.textContent = '';
  })

  currentPlayer = player_o;
}
restart.addEventListener('click' , function(){
  winner.classList.add('hidden')
  winnerMessage.innerHTML = '';
  restartGame();
})



