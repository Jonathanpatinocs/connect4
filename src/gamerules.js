import check from "./assets/images/icon-check.svg"
import displayMainMenu from "./mainmenu";
const gameRulesDom = () => {
    const container = document.getElementById('container');
    container.innerHTML = "";
    container.classList.remove('menu');

    const gameRulesContainer = document.createElement('div');
    gameRulesContainer.id = "gameRulesContainer";

    const gameRulesDiv = document.createElement('div');
    gameRulesDiv.id = 'gameRulesDiv';
    const heading = document.createElement('h1');
    heading.innerText = "RULES";
    
    // objective div
    const objectiveDiv = document.createElement('div');
    objectiveDiv.id = 'objectiveDiv';
    const objectiveDivHeading = document.createElement('h2');
    objectiveDivHeading.innerText = "OBJECTIVE";
    const objectiveDivText = document.createElement('p');
    objectiveDivText.innerText = "Be the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, or diagonally).";
    objectiveDiv.append(objectiveDivHeading, objectiveDivText)
    // How to Play div
    const htpDiv = document.createElement('div');
    htpDiv.id = "htpDiv";
    const htpDivHeading = document.createElement('h2');
    htpDivHeading.innerText = "HOW TO PLAY";
    const htpList = document.createElement('ol');
    const htp1 = document.createElement('li');
    const htp2 = document.createElement('li');
    const htp3 = document.createElement('li');
    const htp4 = document.createElement('li');
    htp1.innerText = "Red goes first in the first game.";
    htp2.innerText = "Players must alternate turns, and only one disc can be dropped in each turn.";
    htp3.innerText = "The game ends when there is a 4-in-a-row or a stalemate.";
    htp4.innerText = "The starter of the previous game goes second on the next game.";
    htpList.append(htp1,htp2,htp3,htp4);
    htpDiv.append(htpDivHeading, htpList);

    const button = document.createElement('div');
    const img = document.createElement('img');
    img.src = check;
    button.append(img);
    button.id = "gameRulesButton";
    button.addEventListener('click', ()=> {
        displayMainMenu(); // return to main menu
    })
    
    gameRulesDiv.append(heading, objectiveDiv, htpDiv, button);
    gameRulesContainer.append(gameRulesDiv);
    container.append(gameRulesContainer);

}

export default gameRulesDom;