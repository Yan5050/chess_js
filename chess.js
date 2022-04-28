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
const PIECES = [ROOK, KNIGHT, BISHOP, KING, QUEEN, BISHOP, KNIGHT, ROOK];

const CHESS_BOARD_ID = 'chess-board';

let game;
let selectedCell;
let selectedPiece;
let pieces = [];
let boardData; 
const table = document.createElement('table');


// breaks code(Unexpected identifier)

function getInitialBoard() {
    let result = pieces;

    specialPieces(result, 0, WHITE_PLAYER); //changed to special
    specialPieces(result, 7, BLACK_PLAYER);
    restOfThePieces(result);

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
function onCellClick(event) {
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
        const pieceBoard = boardData.getPiece();
        if (selectedPiece !== undefined && game.tryMove(selectedPiece, row, col)) {
            selectedPiece = undefined;
            createChessBoard(game.boardData); // if game copies itself, not redeleting this is the problem
        // } else {
        //     tryUpdateSelectedPiece(row, col);
          }
            
        }

    }

function convertXY(cords) {
    let tablez = []
    for (let i = 0; i < cords.length; i++) {
        if (cords === undefined); {

        }
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
    // Create list of pieces (64 total)\
    game = new Game(WHITE_PLAYER);
    // boardData = new BoardData(getInitialBoard());
    // console.log(boardData)
    createChessBoard(game.boardData);
}

function createChessBoard() {
    //creates the board
    //       table = document.getElementById(CHESS_BOARD_ID);
    //   if (table !== null) {
    //     table.remove();
    //   }
    document.body.appendChild(table);
    for (let i = 0; i < BOARD_SIZE; i++) {
        const row = table.insertRow();
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
