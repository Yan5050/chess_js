const BOARD_SIZE = 8;

const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';

//if all the constants are the same as their names they are pretty pointless
const PAWN = 'pawn';
const ROOK = 'rook';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';
const KNIGHT = 'knight';

// first "const" the "let"

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
            relativeMoves = this.getRookMoves();
        }



        let absoluteMoves = [];
        for (let relativeMove of relativeMoves) {
            absoluteMoves.push([relativeMove[0] + this.row, relativeMove[1] + this.col]);
        }
        let filteredMoves = [];
        for (let absoluteMove of absoluteMoves) {
            if (absoluteMove[0] >= 0 && absoluteMove[0] <= 7 && absoluteMove[1] >= 0 && absoluteMove[1] <= 7) {
                filteredMoves.push(absoluteMove);
                return filteredMoves;
            }
        }
        //make bounds, filter moves out of bound


    }
    getPawnMoves() {
        // need to add logic
        return [[1, 0]];
    }

    getRookMoves() {
        let result = [];
        for (let i = 1; i < BOARD_SIZE; i++) {
            result.push([i, 0]);
            result.push([-i, 0]);
            result.push([0, i]);
            result.push([0, -i]);
        }
    }
    getKnightMoves() {
        let result = [];
        result.push([1, 2][-1, 2][1, -2][-1, -2][2, 1][2, -1][-2, 1][-2, -1])
        return result
    }


    getBishopMoves() {
        //need to check logic
        let result = [];
        for (let i = 1; i < BOARD_SIZE; i++) {
            result.push([i, i]);
            result.push([-i, -i]);
        }
    }
    getKingMoves() {
        let result = [];
        for (let row = 0; row <= 2; row++) { //should work
            for (let col = 0; col <= 2; col++) {
                if (row !== 0 || col !== 0) {
                    result.push([row, col])
                }
            }
        }

    }
    getQueenMoves() {
        let result = [];
        for (let i = 1; i < BOARD_SIZE; i++) { //bishop logic
            result.push([i, i]);
            result.push([-i, -i]);
            let result = [];
            for (let j = 1; j < BOARD_SIZE; j++) { //rook logic
                result.push([j, 0]);
                result.push([-j, 0]);
                result.push([0, j]);
                result.push([0, -j]);
            }


            result.push
        }
    }
    // breaks code(Unexpected identifier)
    
    


}

//yuval code, NEED TO CHECK!!!
class BoardData {
    constructor(pieces) {
      this.pieces = pieces;
    }

    getPiece(row, col) {
        for (let i = 0; i < this.pieces.length; i++) {
            if(this.pieces[i].row == row && this.pieces[i].col == col) {
                return this.pieces[i];
            }
        }
    }
}

function getInitialBoard() {
    let result = [];

    specialPieces(result, 0, WHITE_PLAYER); //changed to special
    specialPieces(result, 7, BLACK_PLAYER);

    for (let i = 0; i < BOARD_SIZE; i++) {
        result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
        result.push(new Piece(6, i, PAWN, BLACK_PLAYER));
    }
    return result;
}
function specialPieces(result, row, player) {
    result.push(new Piece(row, 0, ROOK, player));
    result.push(new Piece(row, 1, KNIGHT, player));
    result.push(new Piece(row, 2, BISHOP, player));
    result.push(new Piece(row, 3, KING, player));
    result.push(new Piece(row, 4, QUEEN, player));
    result.push(new Piece(row, 5, BISHOP, player));
    result.push(new Piece(row, 6, KNIGHT, player));
    result.push(new Piece(row, 7, ROOK, player));
}


function addImage(cell, player, name) {
    const image = document.createElement('img');
    image.src = player + '/' + name + '.png'; //dependes on saved location
    cell.appendChild(image);
}
//colors cell
function onCellClick(event, row, col) {
    console.log('row', row);
    console.log('col', col);
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            table.rows[i].cells[j].classList.remove('possible-move');
        }
    }
    const piece = boardData.getpiece(row,col); //make boardData global
    if (piece !== undefined) {
        let possibleMoves = piece.getPossibleMoves(); //this is not a piece, it's an html element
        for (let possibleMove of possibleMoves) {
            const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
            cell.classList.add('possible-move');
        }
    }

    if (selectedCell !== undefined) {
        //need to fix this^, makes the red color not visable
        selectedCell.classList.remove('selected');
    }
    selectedCell = event.currentTarget;
    selectedCell.classList.add('selected');
}
// onPieceClick doesnt work.
function onPieceClick(event) { //supposed to be used for second kind of marker
    if (selectedPiece !== undefined && selectedPiece !== selectedCell) {
        selectedPiece.classList.remove('selected2');
    }
    selectedPiece = event.currentTarget;
    selectedPiece.classList.add('selected2');
}

function createChessBoard() {
    //creates the board
    document.body.appendChild(table);

    for (let i = 0; i < BOARD_SIZE; i++) { //changed to i
        const row = table.insertRow(); //changed to row
        for (let col = 0; col < BOARD_SIZE; col++) {
            const cell = row.insertCell();
            if ((i + col) % 2 === 0) {
                cell.className = 'white-cell';
            } else {
                cell.className = 'black-cell'
                //   cell.id = "cell-" + i.toString() + "_" + j.toString();
            }
            cell.addEventListener('click', (event) => onCellClick(event, i, col));
        }
    }

    pieces = getInitialBoard();
    console.log(pieces) //test
    // pieces[20].getPossibleMoves(); test //NEED TO FIX THIX! (error at 174:16, 47:38 (realtiveMoves is not defined))


    for (let piece of pieces) {
        addImage(table.rows[piece.row].cells[piece.col], piece.player, piece.type);
    }
}

window.addEventListener('load', createChessBoard);
