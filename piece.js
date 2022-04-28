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

        // let absoluteMoves = [];
        // for (let relativeMove of relativeMoves) {
        //     absoluteMoves.push([relativeMove[0] + this.row, relativeMove[1] + this.col]);
        // }
        // let filteredMoves = [];
        // for (let absoluteMove of absoluteMoves) {
        //     if (absoluteMove[0] >= 0 && absoluteMove[0] <= 7 && absoluteMove[1] >= 0 && absoluteMove[1] <= 7) {
        //         filteredMoves.push(absoluteMove)
        //     }
        // }
        //make bounds, filter moves out of bound
        return relativeMoves;


    }
    getMovesInDirection(rowDir, colDir, range) {
        let result = [];
        let row;
        let col;
        // console.log("row: " + rowDir + ", column: " + colDir)
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
                // console.log(row, col, move)
                result.push([row, col]);
                // console.log("I just pushed")
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
        let result = []
        if (this.getOpponentColor() !== WHITE_PLAYER) {
            result = this.getMovesInDirection('forward', 'none', 2)
            return result;
        }
        if (boardData.isPlayer()){
            console.log(piece)
        }
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
        for (let move of horseMoves) { //horse is a place holder
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
        // console.log(result)
        return result;
    }
    getKingMoves() {
        let result = [];
        result = this.getMovesInDirection('forward', 'none', 2).concat(this.getMovesInDirection('forward', 'forward', 2)).concat(this.getMovesInDirection('forward', 'backwards', 2)).concat(this.getMovesInDirection('none', 'forward', 2)).concat(this.getMovesInDirection('none', 'backwards', 2)).concat(this.getMovesInDirection('backwards', 'forward', 2)).concat(this.getMovesInDirection('backwards', 'none', 2)).concat(this.getMovesInDirection('backwards', 'forward', 2)).concat(this.getMovesInDirection('backwards', 'backwards', 2))
        // console.log(result)
        return result
    }

    getQueenMoves() {
        let result = this.getBishopMoves().concat(this.getRookMoves())
        return result
    }
}