
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
        this.players = [player1, player2]; // Array to keeps track of turn
        this.currentPlayer = 0;
    }

    createBoard() { //  returns 6x7 game board , 0 = empty, 1 = Red player, 2 = Yellow Player
        const rows = 6;
        const cols = 7;
        const board = Array.from({length: rows }, ()=> Array(cols).fill(0));
        
        return board;
    }

    dropDisc(col) {
        let token = this.players[this.currentPlayer].token;
        console.log(token);
        
        let found = false;
        for(let i = 0; i < 6; i++) { // drops the disc at the next available spot in the column
            if (!found){
                if (i == 5 ) { // no discs in a column case
                    this.board[i][col] = token;
                    this.checkWin(i, col);
                    found = true;
                }
                else if (this.board[i][col] == 0) {   // if next spot is unavailable, drop disc at the current spot
                    if(this.board[i + 1][col] != 0) {   
                        this.board[i][col] = token;
                        this.checkWin(i, col);
                        found = true;
                    }
                }  
            }
        }
        console.log(this.board);
        this.switchPlayer();
    }
    
    checkWin(row, col) { // checks win by looking at the surrounding tokens of the last placed token
        let token = this.players[this.currentPlayer].token;
        if (this.checkHorizontal(row, col)) {
            console.log(`${token} wins`);
            
            return true;
        };
        
    }

    checkHorizontal(row, col) {
        let token = this.players[this.currentPlayer].token;
        let x = 1; // count of tokens in a row
        let leftBlocked = false;
        let leftOfToken = 0;
        while(!leftBlocked) { //
            leftOfToken++;
            if(this.board[row, col - leftOfToken] !== null && this.board[row, col - leftOfToken] == token) {
                x++;
            }
            else {
                leftBlocked = true;
            }
        }
        let rightBlocked = false;
        let rightOfToken = 0;
        while(!rightBlocked) {
            if(this.board[row, col + rightOfToken] !== null && this.board[row, col + rightOfToken] == token) {
                x++;
            }
            else {
                rightBlocked = true;
            }
        }
        if( x => 4) {
            return true;
        }
    }

    checkVertical(row, col) {
        let token = this.players[this.currentPlayer].token;
    }

    checkLeftDiagonal(row, col) {
        let token = this.players[this.currentPlayer].token;
    }

    checkRightDiagonal(row, col) {
        let token = this.players[this.currentPlayer].token;
    }

    switchPlayer() {
        this.currentPlayer = 1 - this.currentPlayer;
    }

    
    play() {
        console.log(player1, player2);
        console.log(this.players[this.currentPlayer]);
        this.switchPlayer();
        console.log(this.players[this.currentPlayer]);
        this.dropDisc(1)
        this.dropDisc(1)
        this.dropDisc(2)
        this.dropDisc(2)
        this.dropDisc(3)
        this.dropDisc(3)
        this.dropDisc(4)
        
         
    }
}
const player1 = new Player("Player 1", 1);
const player2 = new Player("Player 2", 2);
const game = new Game(player1, player2);

export default game;


