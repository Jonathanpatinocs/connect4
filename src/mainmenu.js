import logoimg from  "./assets/images/logo.svg"
import displayPvp from "./pvpdom";
import {AIPlayer, AIPlayerHard, Game, Player} from "./game";
import gameRulesDom from "./gamerules";

const displayMainMenu = () => {
    const container = document.getElementById('container');
    container.innerHTML = "";
    container.classList.add("menu");
    const mainDiv = document.createElement('div');
    mainDiv.id = "mainMenuContainer";
    const mainMenu = document.createElement('div');
    mainMenu.id = "mainMenu";
    const logo = document.createElement('img');
    logo.src = logoimg;
    logo.id = "menuLogo";
    const pvpDiv = document.createElement('button');
    pvpDiv.id = "pvpDiv";
    pvpDiv.innerText = "Player vs Player";
    const pvcDiv = document.createElement('button');
    pvcDiv.id = "pvcDiv";
    pvcDiv.innerText = "Player vs CPU (Normal)";
    const pvcHardDiv = document.createElement('button');
    pvcHardDiv.id = "pvcHardDiv";
    pvcHardDiv.innerText = "Player vs CPU (Hard)";
    const gameRules = document.createElement('button');
    gameRules.id = "gameRules";
    gameRules.innerText = "Game Rules";


    pvpDiv.addEventListener('click', ()=> {
        const player1 = new Player("Player 1", 1);
        const player2 = new Player("Player 2", 2);
        const game = new Game(player1, player2);
        displayPvp(game);
    })
    pvcDiv.addEventListener('click', ()=> {
        const player1 = new Player("Player 1", 1);
        const aiPlayer = new AIPlayer("Normal AI", 2)
        const game = new Game(player1, aiPlayer);
        displayPvp(game)
    })
    pvcHardDiv.addEventListener('click',()=> {
        const player1 = new Player("Player 1", 1);
        const player2 = new AIPlayerHard("Hard AI", 2);
        const game = new Game(player1, player2);
        displayPvp(game);
    })
   gameRules.addEventListener('click', ()=> {
    gameRulesDom();
   })
    mainMenu.append(logo, pvpDiv, pvcDiv, pvcHardDiv, gameRules);
    mainDiv.append(mainMenu);
    container.append(mainDiv);
    
}

export default displayMainMenu;