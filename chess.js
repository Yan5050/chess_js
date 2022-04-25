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




        let absoluteMoves = [];
        for (let relativeMove of relativeMoves) {
            absoluteMoves.push([relativeMove[0] + this.row, relativeMove[1] + this.col]);
        }
        let filteredMoves = [];
        for (let absoluteMove of absoluteMoves) {
            if (absoluteMove[0] >= 0 && absoluteMove[0] <= 7 && absoluteMove[1] >= 0 && absoluteMove[1] <= 7) {
                filteredMoves.push(absoluteMove)
            }
        }
        //make bounds, filter moves out of bound
        return filteredMoves;


    }
    getPawnMoves() {
        if (this.getOpponentColor() !== WHITE_PLAYER){
        return [[1, 0]];
    }else{
        return [[-1, 0]];
    }
}    

    getRookMoves() {
        let result = [];
        for (let i = 1; i < BOARD_SIZE; i++) {
            result.push([i, 0]);
            result.push([-i, 0]);
            result.push([0, i]);
            result.push([0, -i]);
            
        }
        return result;
    }
    getKnightMoves() {
        let result = [];
        result.push([1, 2],[-1, 2],[1, -2],[-1, -2],[2, 1],[2, -1],[-2, 1],[-2, -1]);
        return result; //?
    }


    getBishopMoves() {
        //need to check logic
        let result = [];
        for (let i = 1; i < BOARD_SIZE; i++) {
            result.push([i, i]);
            result.push([i, -i]);
            result.push([-i, i]);
            result.push([-i, -i]);
        }
        return result;
    }

    getKingMoves() {
        let result = [];
        for (let row = -1; row <= 1; row++) { //should work
            for (let col = -1; col <= 1; col++) {
                if (row !== 0 || col !== 0) {
                    result.push([row, col])
                }
            }
        }
        return result
    }

    getQueenMoves() {
        let result = [];
        for (let i = 1; i < BOARD_SIZE; i++) { //bishop logic
            result.push([i, i]);
            result.push([i, -i]);
            result.push([-i, i]);
            result.push([-i, -i]);
            for (let j = 1; j < BOARD_SIZE; j++) { //rook logic
                result.push([j, 0]);
                result.push([-j, 0]);
                result.push([0, j]);
                result.push([0, -j]);
            }
        }
        return result
    }


    // breaks code(Unexpected identifier)





    isEmpty(row, col) {
        return this.getPiece(row, col) === undefined;
    }

    isPlayer(row, col, player) {
        const piece = this.getPiece(row, col);
        return piece !== undefined && piece.player === player;
    }
}

function getInitialBoard() {
    let result = pieces;

    specialPieces(result, 0, WHITE_PLAYER); //changed to special
    specialPieces(result, 7, BLACK_PLAYER);

    for (let j = 0; j < BOARD_SIZE; j++) {
        result[1 * BOARD_SIZE + j] = (new Piece(1, j, PAWN, WHITE_PLAYER));
        result[6 * BOARD_SIZE + j] = (new Piece(6, j, PAWN, BLACK_PLAYER));
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

function addImage(cell, player, name) {
    const image = document.createElement('img');
    image.src = player + '/' + name + '.png'; //dependes on saved location
    cell.appendChild(image);
}
//remove all previous selected and highlighted cells, and then adds them according to the new click 
function onCellClick(event) { //deleted event
    removePreSelected();
    removeAllHighlights();
    selectedCell = event.currentTarget;
    let piece = pieces[selectedCell.id.slice(4)]
    returnsPieceType()
    if (returnsPieceType() !== EMPTY) {
        console.log(piece.getPossibleMoves())
        coloringBlocks = piece.getPossibleMoves()
       
        coloringPossibleMoves(convertXY(coloringBlocks))
        


        // possible-move
    }



    // console.log(selectedCell)

    console.log(piece)
    selectedCell.classList.add('selected');
    // console.log(selectedCell)
    // console.log(piece.type)
    // coloringPossibleMoves();
}
function convertXY(cords) {
    let tablez = []
    for (let i = 0; i < cords.length; i++) {
        tablez.push(table.rows[cords[i][0]].cells[cords[i][1]])
    }
    return tablez
}

function returnsPieceType() {
    return pieces[selectedCell.id.slice(4)].type;
}
function coloringPossibleMoves(htmlCells){
    for (let i = 0; i < htmlCells.length; i++) {
        htmlCells[i].classList.add('possible-move');
    }

}
// function coloringPossibleMoves() {
//     console.log(pieces, selectedCell)
//     addEventListener('click', (event) => { returnsPieceType(event) });
//     if (selectedCell !== "empty") {
        // console.log("it workes");
        // selectedCell.classList.add('possible-move');
//     }
// }
    // playerTypeWhite = this.WHITE_PLAYER
    // playerTypeBlack = this.BLACK_PLAYER

    // pieceMoves = event.currentTarget;
    // let temp = piece.getPossibleMoves();
//     for (let newTemp of temp)
//     pieceMoves.classList.add('possible-move');

function removePreSelected() {
    if (selectedCell !== undefined) {
        //need to fix this^, makes the red color not visable
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

function createChessBoard() {
    //creates the board
    document.body.appendChild(table);
    for (let i = 0; i < BOARD_SIZE; i++) { //changed to i
        const row = table.insertRow(); //changed to row
        for (let j = 0; j < BOARD_SIZE; j++) {
            const cell = row.insertCell();
            cell.id = "cell" + eval(i * BOARD_SIZE + j)
            if ((i + j) % 2 === 0) {
                cell.className = 'white-cell';
            } else {
                cell.className = 'black-cell'
                //   cell.id = "cell-" + i.toString() + "_" + j.toString();
            }
            pieces.push(new Piece(i, j, EMPTY, EMPTY));
            // console.log(pieces[i*BOARD_SIZE + j])
            cell.addEventListener('click', (event) => { onCellClick(event) });//prob cell, might be col?
            // bug (cant fix this before classes)
        }
    }
    // boardData = new BoardData(getInitialBoard());
    pieces = getInitialBoard();
    // console.log(pieces) //test
    // pieces[20].getPossibleMoves(); test //NEED TO FIX THIX! (error at 174:16, 47:38 (realtiveMoves is not defined))


    for (let piece of pieces) {
        // Only add an image to cells that are not empty.
        if (piece.type !== 'empty') addImage(table.rows[piece.row].cells[piece.col], piece.player, piece.type);
    }
}

window.addEventListener('load', createChessBoard);