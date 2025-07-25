
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
        if (this.checkHorizontal(row, col) == true) {
            console.log(`${token} win horizontal`)
        }
        if (this.checkVertical(row, col) == true) {
            console.log(`${token} win vertical`)
        }
        if (this.checkRightDiagonal(row, col) == true) {
            console.log(`${token} win right diagonal`)
        }
        if (this.checkLeftDiagonal(row, col) == true) {
            console.log(`${token} win left diagonal`)
        }
    
        
    }

    checkHorizontal(row, col) {
        let token = this.players[this.currentPlayer].token;
        let x = 1; // count of tokens horizontally
        let leftBlocked = false;
        let leftOfToken = 0;
        while(!leftBlocked) { // loops to count left tokens until it hits the edge or hits the opposing players token
            leftOfToken++;
            if (!(col - leftOfToken < 0)) {
                if(this.board[row][col - leftOfToken] == token) {
                    x++;
                }
                else {
                    leftBlocked = true;
                }
            }
            else {
                leftBlocked = true;
            }
        }
        let rightBlocked = false;
        let rightOfToken = 0;
        while(!rightBlocked) { // loops to count right tokens until it hits the edge or hits the opposing players token
            rightOfToken++;
            if(!(col + rightOfToken > 6)) {
                if(this.board[row][col + rightOfToken] == token) {
                    x++;
                }
                else {
                    rightBlocked = true;
                }
            }
            else {
                rightBlocked = true;
            }
            
        }
        if( x >= 4) {
           
            
            return true;
        }
       
    }

    checkVertical(row, col) { // 
        let token = this.players[this.currentPlayer].token;
        let x = 1; // count of tokens vertically
        
        let bottomBlocked = false;
        let bottomOfToken = 0;
        while(!bottomBlocked) { // loops to count bottom tokens until it hits the edge or hits the opposing players token
            bottomOfToken++;
            if (!(row + bottomOfToken > 5)) {
                if(this.board[row + bottomOfToken][col] == token) {
                    x++;
                }
                else {
                    bottomBlocked = true;
                }
            }
            else {
                bottomBlocked = true;
            }
        }
        if( x >= 4) {
            return true;
        }
    }

    checkLeftDiagonal(row, col) {
        let token = this.players[this.currentPlayer].token;
        let x = 1; // count of tokens diagonally (left)
        let topLeftBlocked = false;
        let topLeftOfToken = 0;
        while(!topLeftBlocked) { // loops to count top left tokens until it hits the edge or hits the opposing players token
            topLeftOfToken++;
            if (!(row - topLeftOfToken < 0) && !(col - topLeftOfToken < 0)) {
                if(this.board[row - topLeftOfToken][col - topLeftOfToken] == token) {
                    x++;
                }
                else {
                    topLeftBlocked = true;
                }
            }
            else {
                topLeftBlocked = true;
            }
        }
        let bottomRightBlocked = false;
        let bottomRightOfToken = 0;
        while(!bottomRightBlocked) { // loops to count bottom right tokens until it hits the edge or hits the opposing players token
            bottomRightOfToken++;
            if(!(row + bottomRightOfToken > 5) && !(col + bottomRightOfToken > 6)) {
                if(this.board[row + bottomRightOfToken][col + bottomRightOfToken] == token) {
                    x++;
                }
                else {
                    bottomRightBlocked = true;
                }
            }
            else {
                bottomRightBlocked = true;
            }
        }
        if( x >= 4) {
            return true;
        }
        

    }

    checkRightDiagonal(row, col) {
        let token = this.players[this.currentPlayer].token;
        let x = 1; // count of tokens diagonally (right)
        let topRightBlocked = false;
        let topRightOfToken = 0;
        while(!topRightBlocked) { // loops to count top right tokens until it hits the edge or hits the opposing players token
            topRightOfToken++;
            if (!(row - topRightOfToken < 0) && !(col + topRightOfToken > 6)) // checks if spot is out of bounds
            {
                if(this.board[row - topRightOfToken][col + topRightOfToken] == token) {
                    x++;
                }
                else {
                    topRightBlocked = true;
                }
            }
            else {
                topRightBlocked = true;
            }
        }
        let bottomLeftBlocked = false;
        let bottomLeftOfToken = 0;
        while(!bottomLeftBlocked) { // loops to count bottom right tokens until it hits the edge or hits the opposing players token
            
            bottomLeftOfToken++;
            if (!(row + bottomLeftOfToken > 5) && !(col - bottomLeftOfToken < 0 )) { // checks if spot is out of bounds
                if(this.board[row + bottomLeftOfToken][col - bottomLeftOfToken] == token) {
                    x++;
                }
                else {
                    bottomLeftBlocked = true;
                }
            }
            else {
                bottomLeftBlocked = true;
            }
        }
  
        if( x >= 4) {
            
            return true;
        }
        
    }

    switchPlayer() {
        this.currentPlayer = 1 - this.currentPlayer;
    }

    
    play() {
        
    }
}
const player1 = new Player("Player 1", 1);
const player2 = new Player("Player 2", 2);
const game = new Game(player1, player2);

export default game;


