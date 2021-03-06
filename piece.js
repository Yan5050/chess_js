class Piece {
    constructor(row, col, type, player) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.player = player;
    }

    getOpponentColor() {
        if (this.player === WHITE_PLAYER) {
            return BLACK_PLAYER;
        }
        return WHITE_PLAYER;
    }
    getPossibleMoves() {
        let relativeMoves;
        if (this.type === PAWN) {
            relativeMoves = this.getPawnMoves();
        } else if (this.type == ROOK) {
            relativeMoves = this.getRookMoves();
        } else if (this.type === KNIGHT) {
            relativeMoves = this.getKnightMoves();
        } else if (this.type === BISHOP) {
            relativeMoves = this.getBishopMoves();
        } else if (this.type === KING) {
            relativeMoves = this.getKingMoves();
        } else if (this.type === QUEEN) {
            relativeMoves = this.getQueenMoves();
        } else {
            console.log("unkown type", type)
        }

        return relativeMoves;


    }
    getMovesInDirection(rowDir, colDir, range) {
        let result = [];
        let row;
        let col;
        for (let i = 1; i < range; i++) {
            row = this.row
            col = this.col

            if (rowDir === 'forward') {
                row += i
            }
            else if (rowDir === 'backwards') {
                row += i * (-1)
            }
            if (colDir === 'forward') {
                col += i
            }
            else if (colDir === 'backwards') {
                col += i * (-1)
            }

            if (row < 0 || row > 7 || col < 0 || col > 7) {
                break;
            }
            let move = [row, col];

            if (boardData.getPiece(move[0], move[1]).type === EMPTY) {
                result.push([row, col]);
            }
            // Enter if the cell is opponent's color
            else if (boardData.getPiece(move[0], move[1]).player === this.getOpponentColor()) {
                // console.log(row, col, move)
                result.push([row, col]);
                break;

            }
            // Enter if the cell is an ally color
            else {
                break;
            }
        }
        return result
    }
    getPawnMoves() {
        let row;
        let col;
        row = this.row;
        col = this.col;
        let result = []
        //this will be used for double-first move (2 tiles) for pawns
        let holdPawnRow = boardData.getPiece(row, col).row
        if (holdPawnRow == 1){
            result = this.getMovesInDirection('forward', 'none', 3)
            console.log(result)
            return result;
        }
        if (holdPawnRow == 6){
            result = this.getMovesInDirection('backwards', 'none', 3)
            console.log(result)
            return result;
        }
            else if (this.getOpponentColor() !== WHITE_PLAYER) {
            result = this.getMovesInDirection('forward', 'none', 2)
            return result;
        }
        // if (boardData.isPlayer()){
        //     console.log(piece)
        // }
        // if (){   ///this will be the logic for moving to the side while "eating"
        //     result = this.getMovesInDirection('forward', 'backwards', 2).concat(this.getMovesInDirection('forward', 'forward', 2))

        // }
         else {
            result = this.getMovesInDirection('backwards', 'none', 2)
            return result;
        }
    }

    getRookMoves() {
        let result = []
        result = this.getMovesInDirection('backwards', 'none', 8).concat(this.getMovesInDirection('none', 'forward', 8)).concat(this.getMovesInDirection('forward', 'none', 8)).concat(this.getMovesInDirection('none', 'backwards', 8))
        // console.log(result)


        return result
    }

    getKnightMoves() {
        let row;
        let col;
        let result = [];
        let horseMoves = [[2, 1], [-2, 1], [2, -1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];
        for (let move of horseMoves) { //"move" is a place holder
            row = this.row;
            col = this.col;
            row = row + move[0];
            col = col + move[1];
            if (row >= 0 && row <= 7 && col >= 0 && col <= 7) {
                if (boardData.getPiece(row, col).player === this.getOpponentColor()) {
                    result.push([row, col]);
                }
                if (boardData.getPiece(row, col).type === EMPTY) {
                    result.push([row, col]);
                }
            }
        }
        return result;
    }


    getBishopMoves() {
        let result = [];
        result = this.getMovesInDirection('forward', 'forward', 8).concat(this.getMovesInDirection('backwards', 'backwards', 8)).concat(this.getMovesInDirection('forward', 'backwards', 8)).concat(this.getMovesInDirection('backwards', 'forward', 8))
        return result;
    }
    getKingMoves() {
        let result = [];
        result = this.getMovesInDirection('forward', 'none', 2).concat(this.getMovesInDirection('forward', 'forward', 2)).concat(this.getMovesInDirection('forward', 'backwards', 2)).concat(this.getMovesInDirection('none', 'forward', 2)).concat(this.getMovesInDirection('none', 'backwards', 2)).concat(this.getMovesInDirection('backwards', 'forward', 2)).concat(this.getMovesInDirection('backwards', 'none', 2)).concat(this.getMovesInDirection('backwards', 'forward', 2)).concat(this.getMovesInDirection('backwards', 'backwards', 2))
        return result
    }

    getQueenMoves() {
        let result = this.getBishopMoves().concat(this.getRookMoves())
        return result
    }
}