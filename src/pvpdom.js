import player1img from "./assets/images/player-one.svg";
import logoimg from  "./assets/images/logo.svg"
import boardLayerBlackImg from "./assets/images/board-layer-black-large.svg"
import boardLayerWhiteImg from "./assets/images/board-layer-white-large.svg"
import playerturnRed from "./assets/images/turn-background-red.svg"
import player2img from "./assets/images/player-two.svg"

import { Game, Player} from "./game";
import displayMainMenu from "./mainmenu";

    
    



const displayPvp = (game) => {


    const container = document.getElementById('container');
    container.innerHTML = "";
    container.classList.remove('menu');
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
    leftPlayerTextDivH3.textContent = game.players[0].name;
    const leftPlayerTextDivP = document.createElement('p');
    leftPlayerTextDivP.textContent = game.players[0].score;
    leftPlayerTextDivP.id = "player1-score";

    leftPlayerTextDiv.append(leftPlayerTextDivH3, leftPlayerTextDivP);
    leftPlayerDiv.append(leftPlayerDivIMG, leftPlayerTextDiv);
    leftContainer.append(leftPlayerDiv);

    /* Middle Container ------------- */

    const middleContainer = document.createElement('div');
    middleContainer.id = "middle-container";
    const middleHeader = document.createElement('div');
    middleHeader.id = "middle-header";
    const menuButton = document.createElement('button');
    menuButton.id = "menu-button";
    menuButton.innerText = "MENU"

    /* Menu Modal --------------- */ 
    const menuModal = document.createElement('dialog');
    menuModal.id = "pvpMenuModal";
    const menuModalH1 = document.createElement('h1');
    menuModalH1.innerText = "PAUSE";
    const menuModalContinue = document.createElement('button');
    menuModalContinue.id = "pvpMenuContinue";
    menuModalContinue.innerText = "CONTINUE GAME";
    menuModalContinue.addEventListener('click', ()=> {
        menuModal.classList.remove('menuModalShow')
        menuModal.close();
    })
    const menuModalRestart = document.createElement('button');
    menuModalRestart.id = "pvpMenuRestart";
    menuModalRestart.innerText = "RESTART";
    menuModalRestart.addEventListener('click', ()=> {
        container.innerHTML = "";
        game.players[0].score = 0;
        game.players[1].score = 0;
        
        displayPvp(game);
        game.restart();
    })
    const menuModalQuit = document.createElement('button');
    menuModalQuit.id = "pvpMenuQuit";
    menuModalQuit.innerText = "QUIT"
    menuModalQuit.addEventListener('click', ()=> {
        displayMainMenu();
    })

    menuButton.addEventListener('click' ,()=> {
        menuModal.classList.add('menuModalShow')
        menuModal.showModal();
    })

    menuModal.append(menuModalH1, menuModalContinue, menuModalRestart, menuModalQuit);
                            

    const logo = document.createElement('img');
    logo.src = logoimg;
    logo.id = "logo";
    const restartButton = document.createElement('button');
    restartButton.id ="restart-button";
    restartButton.textContent = "RESTART";

    restartButton.addEventListener('click', ()=> {
        container.innerHTML = "";
        game.players[0].score = 0;
        game.players[1].score = 0;
        displayPvp(game);
        game.restart();
    })
    const header = document.createElement('div');
    header.id  = "header"
    header.append(menuButton, logo, restartButton);
    middleHeader.append(header);

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
                if(game.currentPlayer == 0) {
                    place.classList.add('red');
                    console.log(game.currentPlayer)
                }
                else{
                    place.classList.add('yellow');
                }
                
                place.classList.add(`col-${col + 1}`);
                place.addEventListener('click', ()=> {
                    dropDisc(col, game);
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

    middleContainer.append( boardDiv, playerTurnContainer, playerTurnH3, playerTurnP);
    
    /* Right Container  */

    const rightContainer = document.createElement('div');
    rightContainer.id = "right-container";
    const rightPlayerDiv = document.createElement('div');
    rightPlayerDiv.id = "right-player";
    const rightPlayerDivIMG = document.createElement('img');
    rightPlayerDivIMG.src = player2img;
    const rightPlayerTextDiv = document.createElement('div');
    const rightPlayerTextDivH3 = document.createElement('h3');
    rightPlayerTextDivH3.textContent = game.players[1].name;
    const rightPlayerTextDivP = document.createElement('p');
    rightPlayerTextDivP.textContent = game.players[1].score;
    rightPlayerTextDivP.id = "player1-score";

    rightPlayerTextDiv.append(rightPlayerTextDivH3, rightPlayerTextDivP);
    rightPlayerDiv.append(rightPlayerDivIMG, rightPlayerTextDiv);
    rightContainer.append(rightPlayerDiv);


    container.append(footer, middleHeader, leftContainer, middleContainer, rightContainer, menuModal);

}

function dropDisc(col, game) { // Drops dics in board using class names
    
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
        const firstRow = document.querySelectorAll('.row-1');
        firstRow.forEach(div => {
            div.classList.remove('row-1');
        })

        console.log(game.players[game.currentPlayer].name);
        game.gameOver = true;
        displayWinner(game.players[game.currentPlayer].name, game);
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
        if(game.currentPlayer == 1) {
            if (game.players[1].ai == true) {
                let col = game.players[1].chooseMove(game);
                console.log("hey");
                if(!game.gameOver) {
                    dropDisc(col, game); 
                }
                  
            }
        }
        
        
    });
}

function displayWinner(winner, game) {
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

    button.addEventListener('click', ()=> {
        const container = document.getElementById('container');
        container.innerHTML = "";
        game.playAgain();
        displayPvp(game);
    })
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
    const winnerTokens = document.querySelectorAll('.winnerToken');
    winnerTokens.forEach(element => {
        const div = document.createElement('div');
        div.className = "winnerTokenCircle";
        element.append(div);
    });
}

export default(displayPvp)