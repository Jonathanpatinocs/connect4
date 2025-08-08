import player1img from "./assets/images/player-one.svg";
import logoimg from  "./assets/images/logo.svg"
import boardLayerBlackImg from "./assets/images/board-layer-black-large.svg"
import boardLayerWhiteImg from "./assets/images/board-layer-white-large.svg"
import playerturnRed from "./assets/images/turn-background-red.svg"
import player2img from "./assets/images/player-two.svg"
import game from "./game";

const displayPvp = () => {
    const container = document.getElementById('container');
    const footer = document.createElement('div');
    footer.id = "footer";

    /*  Left Container */ 
    const leftContainer = document.createElement('div');
    leftContainer.id = "left-container";
    const leftPlayerDiv = document.createElement('div');
    leftPlayerDiv.id = "left-player";
    const leftPlayerDivIMG = document.createElement('img');
    leftPlayerDivIMG.src = player1img;
    const leftPlayerTextDiv = document.createElement('div');
    const leftPlayerTextDivH3 = document.createElement('h3');
    leftPlayerTextDivH3.textContent = "PLAYER 1";
    const leftPlayerTextDivP = document.createElement('p');
    leftPlayerTextDivP.textContent = "30";
    leftPlayerTextDivP.id = "player1-score";

    leftPlayerTextDiv.append(leftPlayerTextDivH3, leftPlayerTextDivP);
    leftPlayerDiv.append(leftPlayerDivIMG, leftPlayerTextDiv);
    leftContainer.append(leftPlayerDiv);

    /* Middle Container */

    const middleContainer = document.createElement('div');
    middleContainer.id = "middle-container";
    const middleHeader = document.createElement('div');
    middleHeader.id = "middle-header";
    const menuButton = document.createElement('button');
    menuButton.id = "menu-button";
    menuButton.textContent = "MENU"

    menuButton.addEventListener('click' ,()=> {
        //////////////////////////////                                                  ------ Need function
    })

    const logo = document.createElement('img');
    logo.src = logoimg;
    logo.id = "logo";
    const restartButton = document.createElement('button');
    restartButton.id ="restart-button";
    restartButton.textContent = "RESTART";

    restartButton.addEventListener('click', ()=> {
        ////////////////////////////                                                    ---- Neeed function
    })

    middleHeader.append(menuButton, logo, restartButton);

    const boardDiv = document.createElement('div');
    boardDiv.id = "board";
    const boardlayout = document.createElement('div');
    boardlayout.id = "board-layout";
    for(let row = 0; row < 6; row++) {
        const rowDom = document.createElement('div');
        for(let col = 0; col < 7; col++) {
            const place = document.createElement('div');
            if(row == 0) {
                place.className = 'row-1';
                place.classList.add('red');
                place.classList.add(`col-${col + 1}`);
                place.addEventListener('click', ()=> {
                    dropDisc(col);
                })
            }
            if(row > 0) {
                place.className =`row-${row + 1}`
                place.classList.add(`col-${col + 1}`);
            }
            
            rowDom.append(place);
        }
        
        boardlayout.append(rowDom);
    }

    const boardLayerBlack = document.createElement('img');
    boardLayerBlack.src = boardLayerBlackImg;
    boardLayerBlack.id = "board-layer-black-large";
    const boardLayerWhite = document.createElement('img');
    boardLayerWhite.src = boardLayerWhiteImg;
    boardLayerWhite.id = "board-layer-white-large";
    boardDiv.append(boardLayerBlack, boardLayerWhite, boardlayout);

    const playerTurnContainer = document.createElement('div');
    playerTurnContainer.id = "player-turn-container";
    const playerTurnContainerIMG = document.createElement('img');
    playerTurnContainerIMG.id = "turn-background-red";
    playerTurnContainerIMG.src = playerturnRed;
    playerTurnContainer.append(playerTurnContainerIMG);
    const playerTurnH3 = document.createElement('h3');
    playerTurnH3.textContent = "PLAYER 1'S TURN";
    playerTurnH3.id = "player-turn";
    const playerTurnP = document.createElement('p');
    playerTurnP.id = "player-turn-timer";
    playerTurnP.innerText = "30s";

    middleContainer.append(middleHeader, boardDiv, playerTurnContainer, playerTurnH3, playerTurnP);
    
    /* Right Container  */

    const rightContainer = document.createElement('div');
    rightContainer.id = "right-container";
    const rightPlayerDiv = document.createElement('div');
    rightPlayerDiv.id = "right-player";
    const rightPlayerDivIMG = document.createElement('img');
    rightPlayerDivIMG.src = player2img;
    const rightPlayerTextDiv = document.createElement('div');
    const rightPlayerTextDivH3 = document.createElement('h3');
    rightPlayerTextDivH3.textContent = "PLAYER 2";
    const rightPlayerTextDivP = document.createElement('p');
    rightPlayerTextDivP.textContent = "30";
    rightPlayerTextDivP.id = "player1-score";

    rightPlayerTextDiv.append(rightPlayerTextDivH3, rightPlayerTextDivP);
    rightPlayerDiv.append(rightPlayerDivIMG, rightPlayerTextDiv);
    rightContainer.append(rightPlayerDiv);


    container.append(footer, leftContainer, middleContainer, rightContainer);

}

function dropDisc(col) { // Drops dics in board using class names
    
    const column = document.querySelectorAll(`.col-${col + 1}`);
    const firstRow = document.querySelectorAll('.row-1'); // first row is the row players can drop their discs
    let player = game.currentPlayer;
    let found = false;
    for(let i = 0; i < column.length; i++) {
        if (!found) {
            if (!found){
                if (i == 5 ) { // no discs in a column case
                    column[i].classList.add(`taken`);
                    column[i].classList.add(`player${player}`);
                    
                    found = true;
                }
                else if (!column[i].classList.contains('taken')) {   // if next spot is unavailable, drop disc at the current spot
                    if(column[i + 1].classList.contains('taken')) {   
                        column[i].classList.add('taken');
                        column[i].classList.add(`player${player}`);
                        found = true;
                    }
                }  
            }
        }
    }
    
    if(game.dropDisc(col)) {
        displayWinner(game.players[game.currentPlayer].name);
        
    }
    

    firstRow.forEach(element => {
        if(element.classList.contains('red')){
            element.classList.remove('red');
            element.classList.add('yellow');
        }
        else {
            element.classList.remove('yellow');
            element.classList.add('red');
        }
        
    });
}

function displayWinner(winner) {
    const container = document.getElementById('player-turn-container');
    const winnerDiv = document.createElement('div');
    const playertext = document.getElementById('player-turn');
    const timertext = document.getElementById('player-turn-timer');
    playertext.innerText = "";
    timertext.innerText = "";
    container.innerHTML = "";
    winnerDiv.id = "winnerDiv";
    const h3 = document.createElement('h3');
    const h1 = document.createElement('h1');
    const button = document.createElement('button');

    
    h3.id = "winnerDivH3";
    h1.id = "winnerDivH1";
    button.id = "winnerDivButton";
    h3.innerText = winner;
    h1.innerText = "WINS";
    button.innerText = "PLAY AGAIN"

    winnerDiv.append(h3,h1,button);
    container.append(winnerDiv);

    const footer = document.getElementById('footer'); // footer to change color to winner color
    if(winner == "Player 1") {
        footer.style.backgroundColor = "#FD6687"
    }
    else {
        footer.style.backgroundColor = "#FFCE67"
    }

    for(let i = 0; i < 4; i++) {
        const winnerToken = document.getElementsByClassName(`row-${game.winnerCoordinates[i][0] + 1} col-${game.winnerCoordinates[i][1] + 1}`);
        winnerToken[0].classList.add("winnerToken");
       
    }
}

export default(displayPvp)