import player1img from "./assets/images/player-one.svg";
import logoimg from  "./assets/images/logo.svg"
import boardLayerBlackImg from "./assets/images/board-layer-black-large.svg"
import boardLayerWhiteImg from "./assets/images/board-layer-white-large.svg"
import playerturnRed from "./assets/images/turn-background-red.svg"
import player2img from "./assets/images/player-two.svg"

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
    for(let i = 0; i < 6; i++) {
        const row = document.createElement('div');
        for(let j = 0; j < 7; j++) {
            const column = document.createElement('div');
            if(i == 0) {
                column.className = 'row-1';
                column.addEventListener('click', ()=> {
                    ////////////////////////////////                                      ------ Need Function
                })
            }
            row.append(column);
        }
        
        boardlayout.append(row);
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




export default(displayPvp)