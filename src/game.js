class Player {
    
}

class Game {
    constructor() {
        this.board = this.createBoard();
    }

    createBoard() { //  returns 6x7 game board , 0 = empty, R = Red player, Y = Yellow Player
        const rows = 6;
        const cols = 7;
        const board = Array.from({length: rows }, ()=> Array(cols).fill(0));
        
        return board;
    }

}

const game = new Game();

export default game;