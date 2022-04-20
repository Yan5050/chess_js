const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';

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
let boardData;
let table;


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
            relativeMove = this.getPawnMoves();
        } else if (this.type == ROOK) {
            relativeMove = this.getRookMoves();
        } else if (this.type === KNIGHT) {
            relativeMove = this.getKnightMoves();
        } else if (this.type === BISHOP) {
            relativeMove = this.getBishopMoves();
        } else if (this.type === KING) {
            relativeMove = this.getKingMoves();
        } else if (this.type === QUEEN) {
            relativeMove = this.getRookMoves();
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
    //   class BoardData {
    //     constructor(pieces) {
    //       this.pieces = pieces;
    //     }


    // getPiece(row, col) { not in use now, gets location
    // }


}

function getInitialBoard() { //need to not use double statments
    let result = [];

    coolPieces(result, 0, WHITE_PLAYER);
    coolPieces(result, 7, BLACK_PLAYER);

    for (let i = 0; i < BOARD_SIZE; i++) {
        result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
        result.push(new Piece(6, i, PAWN, BLACK_PLAYER));
    }
    return result;
}
function coolPieces(result, row, player) {
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
    const piece = boardData.getPiece(row, col);
    if (piece !== undefined) {
        let possibleMoves = piece.getPossibleMoves();
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
    const table1 = document.createElement('table');
    document.body.appendChild(table1);
    for (let row = 0; row < BOARD_SIZE; row++) {
        const rowElement = table1.insertRow();
        for (let col = 0; col < BOARD_SIZE; col++) {
            const cell = rowElement.insertCell();
            if ((row + col) % 2 === 0) {
                cell.className = 'white-cell';
            } else {
                cell.className = 'black-cell'
                //   cell.id = "cell-" + i.toString() + "_" + j.toString();
            }
            cell.addEventListener('click', (event) => onCellClick(event, row, col));
        }
    }

    pieces = getInitialBoard();
    console.log(pieces) //test
    // pieces[20].getPossibleMoves(); test //NEED TO FIX THIX! (error at 174:16, 47:38 (realtiveMoves is not defined))


    for (let piece of pieces) {
        addImage(table1.rows[piece.row].cells[piece.col], piece.player, piece.type);
    }
}

window.addEventListener('load', createChessBoard);
