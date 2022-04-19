const BOARD_SIZE = 8;
const WHITE_TYPE = 'white';
const DARK_TYPE = 'black';

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



class Piece {
    constructor(row, col, type, player) {
      this.row = row;
      this.col = col;
      this.type = type;
      this.player = player;
    }

    getPossibleMoves() {
        let relativeMove;
        if (this.type === PAWN) {
            relativeMove = this.getPawnMoves();
            } else if(this.type == ROOK) {
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
                if (absoluteMove[0] >= 0 && absoluteMove[0] <= 7 && absoluteMove[1] >= 0 && absoluteMove[1] <= 7){
                    filteredMoves.push(absoluteMove);
                    return filteredMoves;
                }
            }
            //make bounds, filter moves out of bound


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
    //creates the board
  const table1 = document.createElement('table');
  document.body.appendChild(table1);
  for (let i = 0; i < BOARD_SIZE; i++) { 
    const rowElement = table1.insertRow();
    for (let j = 0; j < BOARD_SIZE; j++) { 
      const cell = rowElement.insertCell();
      if ((i + j) % 2 === 0) {
        cell.className = 'white-cell';
    }else {
        cell.className = 'black-cell'
    //   cell.id = "cell-" + i.toString() + "_" + j.toString();
        }
        cell.addEventListener('click', onCellClick);
    }
  }
    pieces = getInitialBoard();
    // console.log(pieces) //test
    // pieces[20].getPossibleMoves(); test


    for (let piece of pieces) {
        addImage(table1.rows[piece.row].cells[piece.col], piece.player, piece.type);
    }
}

window.addEventListener('load', createChessBoard);