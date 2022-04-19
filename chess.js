
const BOARD_SIZE = 8;
const WHITE_TYPE = 'white';
const DARK_TYPE = 'black';

let selectedCell;
let selectedPiece;
let pieces = [];

const PAWN = 'pawn'
const ROOK = 'rook'
const BISHOP = 'bishop'
const KING = 'king'
const QUEEN = 'queen'
const KNIGHT = 'knight'


class Piece {
    constructor(row, col, type, player) {
      this.row = row;
      this.col = col;
      this.type = type;
      this.player = player;
    }

    getPossibleMoves() {
        let result = [];
        if (this.type === PAWN) {
            let possibleMoves = this.getPawnMoves()
            console.log('before', possibleMoves) //test
            for (let i = 0; i <possibleMoves.length; i++) {
                possibleMoves[i][0] += this.row;
                possibleMoves[i][1] += this.col;
            }
            console.log('after', possibleMoves);

            
            } else if(this.type == ROOK) {
                realativeMoves = this.getRookMoves

            } else if (this.type === KNIGHT) {
                
            } else if (this.type === BISHOP) {

            } else if (this.type === KING) {

            } else if (this.type === QUEEN) {
            
            }
            let absouluteMoves = [];
            for (let relativeMove of realativeMoves) {
                absouluteMoves.push([realativeMoves[0] + this.row, realativeMoves[1] + this.col]);
            }
            let filteredMoves = [];
            for (let absouluteMove of absouluteMoves) {
                if (absouluteMove[0] >= 0 && absouluteMove[0] <= 7 && absouluteMove[1] >= 0 && absouluteMove[1] <= 7){
                    filteredMoves.push(absouluteMove) ;
                }
            }
            //make bounds, filter moves out of bound


        return result //the result is not linked to the change done in the loop
    }
    getPawnMoves(){
        // diffrent mvmnt for black
        return[[1, 0]];
    }
    getRookMoves(){
        let result = [];
        for (let i = 1; i < BOARD_SIZE; i++) {
        result.push([i, 0]);
        result.push([-i, 0]);
        result.push([0, i]);
        result.push([0, -i]);
        }
    }
    getKnightMoves(){
        // diffrent mvmnt for black
        return[[1, 0]];
    }
    getBishopMoves(){
        // diffrent mvmnt for black
        return[[1, 0]];
    }
    getKingMoves(){
        // diffrent mvmnt for black
        return[[1, 0]];
    }
    getQueenMoves(){
        // diffrent mvmnt for black
        return[[1, 0]];
    }
  }

  function getInitialBoard() {
    let result = [];
    result.push(new Piece(0, 0, ROOK, WHITE_TYPE))
    result.push(new Piece(0, 1, KNIGHT, WHITE_TYPE))
    result.push(new Piece(0, 2, BISHOP, WHITE_TYPE))
    result.push(new Piece(0, 3, KING, WHITE_TYPE))
    result.push(new Piece(0, 4, QUEEN, WHITE_TYPE))
    result.push(new Piece(0, 5, BISHOP, WHITE_TYPE))
    result.push(new Piece(0, 6, KNIGHT, WHITE_TYPE))
    result.push(new Piece(0, 7, ROOK, WHITE_TYPE))
    result.push(new Piece(7, 0, ROOK, DARK_TYPE))
    result.push(new Piece(7, 1, KNIGHT, DARK_TYPE))
    result.push(new Piece(7, 2, BISHOP, DARK_TYPE))
    result.push(new Piece(7, 4, QUEEN, DARK_TYPE))
    result.push(new Piece(7, 3, KING, DARK_TYPE))
    result.push(new Piece(7, 5, BISHOP, DARK_TYPE))
    result.push(new Piece(7, 6, KNIGHT, DARK_TYPE))
    result.push(new Piece(7, 7, ROOK, DARK_TYPE))
    for (let k = 0; k < BOARD_SIZE; k++){
        result.push(new Piece(1, k, "pawn", WHITE_TYPE));
        result.push(new Piece(6, k, "pawn", DARK_TYPE));
}


    return result;
  }

function addImage(cell, type, name) {
  const image = document.createElement('img');
  image.src =  type + '/' + name + '.png'; //dependes on saved location
  cell.appendChild(image);
}

function onCellClick(event) { //colors cell
    if (selectedCell !== undefined) {
      selectedCell.classList.remove('selected');
    }
    selectedCell = event.currentTarget;
    selectedCell.classList.add('selected');
  }

  function onPieceClick(event) { //supposed to be used for second kind of marker
    if (selectedPiece !== undefined && selectedPiece !== selectedCell) {
      selectedPiece.classList.remove('selected2');
    }
    selectedPiece = event.currentTarget;
    selectedPiece.classList.add('selected2');
  }

function createChessBoard() {
  const table1 = document.createElement('table');
  document.body.appendChild(table1);
  for (let i = 0; i < BOARD_SIZE; i++) { 
    const row = table1.insertRow();
    for (let j = 0; j < BOARD_SIZE; j++) { 
      const cell = row.insertCell();
      cell.id = "cell-" + i.toString() + "_" + j.toString();
      cell.addEventListener('click', onCellClick);
      cell.addEventListener('click', onPieceClick);
        }
    }
    pieces = getInitialBoard();
    console.log(pieces) //test
    pieces[20].getPossibleMoves();

    for (let piece of pieces) {
        addImage(table1.rows[piece.row].cells[piece.col], piece.player, piece.type);
    }
}

window.addEventListener('load', createChessBoard);

