const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';

const PAWN = 'pawn';
const ROOK = 'rook';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';
const KNIGHT = 'knight';
const EMPTY = 'empty';
const CHESS_BOARD_ID = 'chess-board';

let selectedCell;
let selectedPiece;
let pieces = [];
let boardData; //still not used
const table = document.createElement('table');


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
    //     getPawnMoves() {
    //     if (this.getOpponentColor() !== WHITE_PLAYER) {
    //         result = getMovesInDirection('forward', 'none')
    //         return result
    //     } else {
    //         result = getMovesInDirection('backwards', 'none')
    //         return result
    //     }
    // }
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
            // else if (rowDir === 'double-forward') {
            //     row += i * (2)
            // }
            // else if (rowDir === 'double-backwards') {
            //     row += i * (-2)
            // }
            // else if (colDir === 'double-forward') {
            //     col += i * (2)
            // }
            // else if (colDir === 'double-backwards') {
            //     col += i * (-2)
            // }

            if (row < 0 || row > 7 || col < 0 || col > 7) {
                // console.log("Out of bounds")
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
<<<<<<< HEAD
        result = []
        if (this.getOpponentColor() !== WHITE_PLAYER) {
            result = this.getMovesInDirection('forward', 'none', 2)
            return result;
        } else {
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

=======
        if (this.getOpponentColor() !== WHITE_PLAYER) {
            return [[1, 0]];
        } else {
            return [[-1, 0]];
        }
    }
//     getPawnMoves() {
//     if (this.getOpponentColor() !== WHITE_PLAYER) {
//         result = getMovesInDirection('forward', 'none')
//         return result
//     } else {
//         result = getMovesInDirection('backwards', 'none')
//         return result
//     }
// }
    getMovesInDirection(rowDir, colDir, range) {
        let result = [];
        // console.log("row: " + rowDir + ", column: " + colDir)
        for (let i = 1; i < range; i++) {
            let row = this.row
            let col = this.col
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
            else if (rowDir === 'double-forward') {
                row += i * (2)
            }
            else if (rowDir === 'double-backwards') {
                row += i * (-2)
            }
            else if (colDir === 'double-forward') {
                col += i * (2)
            }
            else if (colDir === 'double-backwards') {
                col += i * (-2)
            }
            if (row < 0 || row > 7 || col < 0 || col > 7) {
                // console.log("Out of bounds")
                break;
            }
            let move = [row, col]

            if (boardData.getPiece(move[0], move[1]).type === EMPTY){
                // console.log(row, col, move)
                result.push([row, col]);
                // console.log("I just pushed")
            }
            // Enter if the cell is opponent's color
            else if(boardData.getPiece(move[0], move[1]).player === this.getOpponentColor()){
                // console.log(row, col, move)
                result.push([row, col]);
                break;
                
            }
            // Enter if the cell is an ally color
            else{
                break;
            }
        }
        return result
    }

    getRookMoves() {
        let result = []
        result = this.getMovesInDirection('backwards', 'none', 8).concat(this.getMovesInDirection('none', 'forward', 8)).concat(this.getMovesInDirection('forward', 'none', 8)).concat(this.getMovesInDirection('none', 'backwards', 8))
        // console.log(result)


        return result
    }

>>>>>>> b30097d63753eff4ff1aa69c5ad609fba9c3f20e
    getKnightMoves() {
        let row;
        let col;
        let result = [];
<<<<<<< HEAD
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
        // result = this.getMovesInDirection('forward', 'none', 2).concat(this.getMovesInDirection('forward', 'forward', 2)).concat(this.getMovesInDirection('forward', 'backwards', 2)).concat(this.getMovesInDirection('none', 'forward', 2)).concat(this.getMovesInDirection('none', 'backwards', 2)).concat(this.getMovesInDirection('backwards', 'forward', 2)).concat(this.getMovesInDirection('backwards', 'none', 2)).concat(this.getMovesInDirection('backwards', 'forward', 2)).concat(this.getMovesInDirection('backwards', 'backwards', 2))
        // result =this.getMovesInDirection('double-forward', 'backwards', 2).concat(this.getMovesInDirection('double-forward', 'forward', 2)).concat(this.getMovesInDirection('double-backwards', 'forward', 2)).concat(this.getMovesInDirection('double-backwards', 'backwards', 2)).concat(this.getMovesInDirection('double-forward', 'backwards', 2)).concat(this.getMovesInDirection('double-forward', 'forward', 2)).concat(this.getMovesInDirection('backwards', 'double-backwards', 2)).concat(this.getMovesInDirection('backwards', 'double-forward', 2))
        // console.log(result) 
=======
        result =this.getMovesInDirection('double-forward', 'backwards', 2).concat(this.getMovesInDirection('double-forward', 'forward', 2)).concat(this.getMovesInDirection('double-backwards', 'forward', 2)).concat(this.getMovesInDirection('double-backwards', 'backwards', 2)).concat(this.getMovesInDirection('double-forward', 'backwards', 2)).concat(this.getMovesInDirection('double-forward', 'forward', 2)).concat(this.getMovesInDirection('backwards', 'double-backwards', 2)).concat(this.getMovesInDirection('backwards', 'double-forward', 2))
        console.log(result)
        return result; 
>>>>>>> b30097d63753eff4ff1aa69c5ad609fba9c3f20e
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
<<<<<<< HEAD
        console.log(result)
=======
>>>>>>> b30097d63753eff4ff1aa69c5ad609fba9c3f20e
        return result
    }

    getQueenMoves() {
        let result = this.getBishopMoves().concat(this.getRookMoves())
        return result
    }
}
class BoardData {
    constructor(pieces) {
        this.pieces = pieces;
    }

    // Returns piece in row, col, or undefined if not exists.
    getPiece(row, col) {
        for (const piece of this.pieces) {
            if (piece.row === row && piece.col === col) {
                return piece;
            }
        }
    }

    isEmpty(row, col) {
        return this.getPiece(row, col) === undefined;
    }

    isPlayer(row, col, player) {
        const piece = this.getPiece(row, col);
        return piece !== undefined && piece.player === player;
    }


    removePiece(row, col) {
        for (let i = 0; i < this.pieces.length; i++) {
            const piece = this.pieces[i];
            if (piece.row === row && piece.col === col) {
                // Remove piece at index i
                this.pieces.splice(i, 1);
            }
        }
    }
}

// breaks code(Unexpected identifier)

function getInitialBoard() {
    let result = pieces;

    specialPieces(result, 0, WHITE_PLAYER); //changed to special
    specialPieces(result, 7, BLACK_PLAYER);
    restOfThePieces(result);

    for (let j = 0; j < BOARD_SIZE; j++) {
<<<<<<< HEAD
        result[1 * BOARD_SIZE + j] = (new Piece(1, j, PAWN, WHITE_PLAYER));
        result[6 * BOARD_SIZE + j] = (new Piece(6, j, PAWN, BLACK_PLAYER));
=======
        result[1 * BOARD_SIZE + j] = (new Piece(1, j, EMPTY, WHITE_PLAYER));
        result[6 * BOARD_SIZE + j] = (new Piece(6, j, EMPTY, BLACK_PLAYER));
>>>>>>> b30097d63753eff4ff1aa69c5ad609fba9c3f20e
    }
    return result;
}
function specialPieces(result, row, player) {
    result[row * BOARD_SIZE + 0] = (new Piece(row, 0, ROOK, player));
    result[row * BOARD_SIZE + 1] = (new Piece(row, 1, KNIGHT, player));
    result[row * BOARD_SIZE + 2] = (new Piece(row, 2, BISHOP, player));
    result[row * BOARD_SIZE + 3] = (new Piece(row, 3, KING, player));
    result[row * BOARD_SIZE + 4] = (new Piece(row, 4, QUEEN, player));
    result[row * BOARD_SIZE + 5] = (new Piece(row, 5, BISHOP, player));
    result[row * BOARD_SIZE + 6] = (new Piece(row, 6, KNIGHT, player));
    result[row * BOARD_SIZE + 7] = (new Piece(row, 7, ROOK, player));
}
function restOfThePieces(result) {
    for (let i = 2; i < 6; i++) {
        for (let j = 0; j < 8; j++) {
            result[i * BOARD_SIZE + j] = new Piece(i, j, EMPTY, EMPTY)

        }
    }

}

function addImage(cell, player, name) {
    const image = document.createElement('img');
    image.src = player + '/' + name + '.png'; //dependes on saved location
    cell.appendChild(image);
}
//remove all previous selected and highlighted cells, and then adds them according to the new click 
<<<<<<< HEAD
function onCellClick(event) {
=======
function onCellClick(event) { 
>>>>>>> b30097d63753eff4ff1aa69c5ad609fba9c3f20e
    removePreSelected();
    removeAllHighlights();
    selectedCell = event.currentTarget;
    let piece = pieces[selectedCell.id.slice(4)]
    returnsPieceType()
    if (returnsPieceType() !== EMPTY) {
        // console.log(piece.getPossibleMoves())
        coloringBlocks = piece.getPossibleMoves()
        coloringPossibleMoves(convertXY(coloringBlocks))
        selectedCell.classList.add('selected');
<<<<<<< HEAD
        const pieceBoard = boardData.getPiece();

    }

}
function convertXY(cords) {
    let tablez = []
    for (let i = 0; i < cords.length; i++) {
        if (cords === undefined); {

        }
=======
        const pieceBoard = boardData.getPiece(); 

    }

}
function convertXY(cords) {
    let tablez = []
    for (let i = 0; i < cords.length; i++) {
>>>>>>> b30097d63753eff4ff1aa69c5ad609fba9c3f20e
        tablez.push(table.rows[cords[i][0]].cells[cords[i][1]])
    }
    return tablez
}

function returnsPieceType() {
    return pieces[selectedCell.id.slice(4)].type;
}
function coloringPossibleMoves(htmlCells) {
    for (let i = 0; i < htmlCells.length; i++) {
        htmlCells[i].classList.add('possible-move');
    }
}
function removePreSelected() {
    if (selectedCell !== undefined) {
        selectedCell.classList.remove('selected');
        selectedCell = undefined
    }
}

function removeAllHighlights() {
    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        let cell = document.querySelector("#cell" + i)
        cell.classList.remove('possible-move')
    }
}
function initGame() {
    // Create list of pieces (64 total)
    boardData = new BoardData(getInitialBoard());
    console.log(boardData)
    createChessBoard(boardData);
}

function createChessBoard() {
    //creates the board
    //       table = document.getElementById(CHESS_BOARD_ID);
    //   if (table !== null) {
    //     table.remove();
    //   }
    document.body.appendChild(table);
<<<<<<< HEAD
    for (let i = 0; i < BOARD_SIZE; i++) {
        const row = table.insertRow();
=======
    for (let i = 0; i < BOARD_SIZE; i++) { 
        const row = table.insertRow(); 
>>>>>>> b30097d63753eff4ff1aa69c5ad609fba9c3f20e
        for (let j = 0; j < BOARD_SIZE; j++) {
            const cell = row.insertCell();
            cell.id = "cell" + eval(i * BOARD_SIZE + j)
            if ((i + j) % 2 === 0) {
                cell.className = 'white-cell';
            } else {
                cell.className = 'black-cell'
                //   cell.id = "cell-" + i.toString() + "_" + j.toString();
            }
            cell.addEventListener('click', (event) => { onCellClick(event) });
        }
    }
    boardData = new BoardData(getInitialBoard());
    pieces = getInitialBoard();
    // pieces[20].getPossibleMoves(); test //NEED TO FIX THIX! (error at 174:16, 47:38 (realtiveMoves is not defined))


    for (let piece of boardData.pieces) {
        // console.log(boardData.pieces)
        // Only add an image to cells that are not empty.
        if (piece !== undefined && piece.type !== 'empty') addImage(table.rows[piece.row].cells[piece.col], piece.player, piece.type);
    }
}

window.addEventListener('load', initGame);
