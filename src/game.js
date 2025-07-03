
class Player {
    constructor(name, token, ai = false) {
        this.name = name;
        this.token = token;
        this.ai = ai;
    } 
}
class AIPlayer extends Player {
    constructor(name, token, difficulty = "hard") {
        super(name, token, true);
        this.difficulty  = difficulty;
    }
}

class Game {
    constructor(player1, player2) {
        this.board = this.createBoard();
        this.players = [player1, player2];
        this.currentPlayer = 0;
    }

    createBoard() { //  returns 6x7 game board , 0 = empty, 1 = Red player, 2 = Yellow Player
        const rows = 6;
        const cols = 7;
        const board = Array.from({length: rows }, ()=> Array(cols).fill(0));
        
        return board;
    }

    dropDisc(col) {

    }
    
    checkWin() {

    }

    switchPlayer() {
        this.currentPlayer = 1 - this.currentPlayer;
    }
    
    play() {
        console.log(player1, player2);
        console.log(this.players[this.currentPlayer]);
        this.switchPlayer();
        console.log(this.players[this.currentPlayer]);
        
    }
}
const player1 = new Player("Player 1", 1);
const player2 = new Player("Player 2", 2);
const game = new Game(player1, player2);

export default game;


