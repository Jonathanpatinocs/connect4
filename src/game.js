
export class Player {
    constructor(name, token, ai = false) {
        this.name = name;
        this.token = token;
        this.ai = ai;
        this.score = 0;
    } 
}
export class AIPlayer extends Player {  // "Normal" Difficuly AI Player
    constructor(name, token, difficulty = "normal") {
        super(name, token, true);
        this.difficulty  = difficulty;
    }

    chooseMove(game) { 
        const opponentToken = game.players[0].token;
        const tempBoard = game.board;

        for(let col = 0; col < 6; col++) { // Checks for any winning moves
           if(this.isValidMove(game.board, col)) {
            if(game.simDropDisc(col, this.token)) {
                console.log("win");
                return col;
            }
           }
        }
        for(let col = 0; col < 6; col++) { // Checks if opponent has winning move and blocks it.
            if(this.isValidMove(game.board, col)) {
                console.log(game.simDropDisc(col, opponentToken));
             if(game.simDropDisc(col, opponentToken) ) {
                console.log("block");
                 return col;
             }
            }
         }
         // If there is no winning or blocking moves, Choose a random valid move.

         const validColumns = []; // push valid columns to array and choose a random one.
         for (let col = 0; col < 6; col++) {
            if (this.isValidMove(game.board, col)) {
                validColumns.push(col);
            }
        }
        
        return (validColumns[Math.floor(Math.random() * validColumns.length)]);
  
    }
    isValidMove(board, col) {
        if(board[0][col] === 0) {
            return true;
        }
        return false;
    }
}

export class AIPlayerHard extends Player { // "Hard" Difficuly AI Player
    constructor(name, token, difficulty = "hard") {
        super(name, token, true);
        this.difficulty  = difficulty;
    }
    chooseMove(game) {
        const aiToken = this.token;
        const opponentToken = game.players[0].token === aiToken ? game.players[1].token : game.players[0].token;

        let bestScore = -Infinity;
        let bestCol = null;

        for (let col = 0; col < 7; col++) {
            if (this.isValidMove(game.board, col)) {
                const tempGame = game.clone();
                tempGame.simDropDiscHard(col, aiToken);

                const score = this.minimax(tempGame, 4, -Infinity, Infinity, false, aiToken, opponentToken); // depth=4
                if (score > bestScore) {
                    bestScore = score;
                    bestCol = col;
                }
            }
        }

        return bestCol;
    }

    isValidMove(board, col) {
        return board[0][col] === 0;
    }

    /* --- Minimax with Alpha-Beta Pruning --- */  // Scores all possible moves and chooses best one
    minimax(game, depth, alpha, beta, maximizingPlayer, aiToken, opponentToken) {
        if (depth === 0 || game.gameOver) {
            return this.evaluateBoard(game.board, aiToken, opponentToken);
        }

        if (maximizingPlayer) {
            let maxEval = -Infinity;
            for (let col = 0; col < 7; col++) {
                if (this.isValidMove(game.board, col)) {
                    const tempGame = game.clone();
                    tempGame.simDropDiscHard(col, aiToken);

                    const evalScore = this.minimax(tempGame, depth - 1, alpha, beta, false, aiToken, opponentToken);
                    maxEval = Math.max(maxEval, evalScore);
                    alpha = Math.max(alpha, evalScore);
                    if (beta <= alpha) break; // prune , Skips pointless search
                }
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (let col = 0; col < 7; col++) {
                if (this.isValidMove(game.board, col)) {
                    const tempGame = game.clone();
                    tempGame.simDropDiscHard(col, opponentToken);

                    const evalScore = this.minimax(tempGame, depth - 1, alpha, beta, true, aiToken, opponentToken);
                    minEval = Math.min(minEval, evalScore);
                    beta = Math.min(beta, evalScore);
                    if (beta <= alpha) break; // prune  Skips pointless search
                }
            }
            return minEval;
        }
    }

    /* --- Evaluation Function --- */
    evaluateBoard(board, aiToken, opponentToken) {
        let score = 0;

        // Center column preference
        const centerCol = Math.floor(board[0].length / 2);
        let centerCount = 0;
        for (let row = 0; row < board.length; row++) {
            if (board[row][centerCol] === aiToken) centerCount++;
        }
        score += centerCount * 3;

        // Count 2s, 3s, and potential wins
        const windows = this.getAllWindows(board);
        windows.forEach(window => {
            const aiCount = window.filter(cell => cell === aiToken).length;
            const oppCount = window.filter(cell => cell === opponentToken).length;
            const emptyCount = window.filter(cell => cell === 0).length;

            if (aiCount === 4) score += 1000;
            else if (aiCount === 3 && emptyCount === 1) score += 50;
            else if (aiCount === 2 && emptyCount === 2) score += 10;

            if (oppCount === 3 && emptyCount === 1) score -= 80; // block opponent
        });

        return score;
    }

    // get all 4 windows
    getAllWindows(board) {
        const windows = [];
        const rows = board.length, cols = board[0].length;

        // Horizontal
        for (let i = 0; i < rows; i++)
            for (let j = 0; j < cols - 3; j++)
                windows.push([board[i][j], board[i][j+1], board[i][j+2], board[i][j+3]]);

        // Vertical
        for (let i = 0; i < cols; i++)
            for (let j = 0; j < rows - 3; j++)
                windows.push([board[i][j], board[i+1][j], board[i+2][j], board[i+3][j]]);

        // Diagonal down-right
        for (let i = 0; i < rows - 3; i++)
            for (let j = 0; j < cols - 3; j++)
                windows.push([board[i][j], board[i+1][j+1], board[i+2][j+2], board[i+3][j+3]]);

        // Diagonal up-right
        for (let i = 3; i < rows; i++)
            for (let j = 0; j < cols - 3; j++)
                windows.push([board[i][j], board[i-1][j+1], board[i-2][j+2], board[i-3][j+3]]);

        return windows;
    }
}



export class Game {
    constructor(player1, player2) {
        this.board = this.createBoard();
        this.players = [player1, player2]; // Array to keeps track of turn
        this.currentPlayer = 0;
        this.winnerCoordinates = [];
        this.gameOver = false;
    }

    createBoard() { //  returns 6x7 game board , 0 = empty, 1 = Red player, 2 = Yellow Player
        const rows = 6;
        const cols = 7;
        const board = Array.from({length: rows }, ()=> Array(cols).fill(0));
        
        return board;
    }
    clone() {
        const newGame = new Game(...this.players);
        newGame.board = this.board.map(row => [...row]); // board copy
        newGame.currentPlayer = this.currentPlayer;
        newGame.winnerCoordinates = this.winnerCoordinates.map(coord => [...coord]);
        newGame.gameOver = this.gameOver;
        return newGame;
    }

    dropDisc(col) {
       
            
        let token = this.players[this.currentPlayer].token;
        
        
        let found = false;
        for(let i = 0; i < 6; i++) { // drops the disc at the next available spot in the column
            if (!found){
                if (i == 5 ) { // no discs in a column case
                    this.board[i][col] = token;
                    this.checkWin(i, col, token);
                    if(this.checkWin(i, col, token)) {
                        this.players[this.currentPlayer].score++;
                        return true;
                    }
                    found = true;
                }
                else if (this.board[i][col] == 0) {   // if next spot is unavailable, drop disc at the current spot
                    if(this.board[i + 1][col] != 0) {   
                        this.board[i][col] = token;
                        this.checkWin(i, col, token);
                        if(this.checkWin(i, col, token)) {
                            this.players[this.currentPlayer].score++;
                            return true;
                        }
                        found = true;
                    }
                }  
            }
        }
        console.log(this.board);
        this.switchPlayer();
    
    }
    simDropDisc(col, token) { // simulate drop disc for ai opponents
        
        
        let found = false;
        for(let i = 0; i < 6; i++) { // drops the disc at the next available spot in the column
            if (!found){
                if (i == 5 ) { // no discs in a column case
                    this.board[i][col] = token;
                    this.checkWin(i, col, token);

                    if(this.checkWin(i, col, token)) {
                        this.board[i][col] = 0;
                        return true;
                    }
                    this.board[i][col] = 0;
                    found = true;
                }
                else if (this.board[i][col] == 0) {   // if next spot is unavailable, drop disc at the current spot
                    if(this.board[i + 1][col] != 0) {   
                        this.board[i][col] = token;
                        this.checkWin(i, col, token);
                        if(this.checkWin(i, col, token)) {
                            this.board[i][col] = 0;
                            return true;
                        }
                        this.board[i][col] = 0;
                        found = true;
                    }
                }  
            }
        }
        return false;
        
    }
    simDropDiscHard(col, token) {
        for (let i = 5; i >= 0; i--) {
            if (this.board[i][col] === 0) {
                this.board[i][col] = token;
                return i; // return row where disc was placed
            }
        }
        return null; // column full
    }
    
    checkWin(row, col, token) { // checks win by looking at the surrounding tokens of the last placed token
        
        if (this.checkHorizontal(row, col, token) == true) {
            console.log(`${token} win horizontal`)
          //  this.players[this.currentPlayer].score++;
            return true;
        }
        if (this.checkVertical(row, col, token) == true) {
            console.log(`${token} win vertical`)
          //  this.players[this.currentPlayer].score++;
            return true;
            
        }
        if (this.checkRightDiagonal(row, col, token) == true) {
            console.log(`${token} win right diagonal`)
         //   this.players[this.currentPlayer].score++;
            return true;
            
        }
        if (this.checkLeftDiagonal(row, col, token) == true) {
            console.log(`${token} win left diagonal`)
          //  this.players[this.currentPlayer].score++;
            return true;
            
        }
        return false;
    
        
    }

    checkHorizontal(row, col, token) {
        
        let x = 1; // count of tokens horizontally
        let leftBlocked = false;
        let leftOfToken = 0;
        let coordinates = []; // keep track of board coordinates in case of win
        coordinates.push([row,col]);
        while(!leftBlocked) { // loops to count left tokens until it hits the edge or hits the opposing players token
            leftOfToken++;
            if (!(col - leftOfToken < 0)) {
                if(this.board[row][col - leftOfToken] == token) {
                    x++;
                    coordinates.push([row, col - leftOfToken]);
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
                    coordinates.push([row, col + rightOfToken]);
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
           
            this.winnerCoordinates = coordinates;
            console.log(this.winnerCoordinates);
            return true;
        }
       
    }

    checkVertical(row, col, token) { // 

        let x = 1; // count of tokens vertically
        let coordinates = []; // keep track of coordinates in case of win
        coordinates.push([row, col]);

        let bottomBlocked = false;
        let bottomOfToken = 0;
        while(!bottomBlocked) { // loops to count bottom tokens until it hits the edge or hits the opposing players token
            bottomOfToken++;
            if (!(row + bottomOfToken > 5)) {
                if(this.board[row + bottomOfToken][col] == token) {
                    x++;
                    coordinates.push([row + bottomOfToken, col])
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
            this.winnerCoordinates = coordinates;
            console.log(this.winnerCoordinates);
            return true;
        }
    }

    checkLeftDiagonal(row, col, token) {

        let x = 1; // count of tokens diagonally (left)
        let coordinates = [];
        coordinates.push([row, col])

        let topLeftBlocked = false;
        let topLeftOfToken = 0;
        while(!topLeftBlocked) { // loops to count top left tokens until it hits the edge or hits the opposing players token
            topLeftOfToken++;
            if (!(row - topLeftOfToken < 0) && !(col - topLeftOfToken < 0)) {
                if(this.board[row - topLeftOfToken][col - topLeftOfToken] == token) {
                    x++;
                    coordinates.push([row - topLeftOfToken, col - topLeftOfToken]);
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
                    coordinates.push([row + bottomRightOfToken, col + bottomRightOfToken]);
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
            this.winnerCoordinates = coordinates;
            console.log(this.winnerCoordinates)
            return true;
        }
        

    }

    checkRightDiagonal(row, col, token) {

        let x = 1; // count of tokens diagonally (right)
        let coordinates = [];
        coordinates.push([row, col]);

        let topRightBlocked = false;
        let topRightOfToken = 0;
        while(!topRightBlocked) { // loops to count top right tokens until it hits the edge or hits the opposing players token
            topRightOfToken++;
            if (!(row - topRightOfToken < 0) && !(col + topRightOfToken > 6)) // checks if spot is out of bounds
            {
                if(this.board[row - topRightOfToken][col + topRightOfToken] == token) {
                    x++;
                    coordinates.push([row - topRightOfToken, col + topRightOfToken])
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
                    coordinates.push([row + bottomLeftOfToken, col - bottomLeftOfToken])
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
            this.winnerCoordinates = coordinates;
            console.log(this.winnerCoordinates)
            return true;
        }
        
    }

    switchPlayer() {
        this.currentPlayer = 1 - this.currentPlayer;
    }

    
    restart() {
        this.board = this.createBoard();
        this.gameOver = false;;
    }
    playAgain() {
        this.restart();
        
        if(this.currentPlayer == 0) {
            this.currentPlayer++;
        }
        else {
            this.currentPlayer--;
        }
    }
}