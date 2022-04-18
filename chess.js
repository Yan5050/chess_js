
const BOARD_SIZE = 8;
const WHITE_TYPE = 'white';
const DARK_TYPE = 'black';

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
  }

  function getInitialBoard() {
    let result = [];
    result.push(new Piece(0, 0, "rook", WHITE_TYPE))
    result.push(new Piece(0, 1, "knight", WHITE_TYPE))
    result.push(new Piece(0, 2, "bishop", WHITE_TYPE))
    result.push(new Piece(0, 3, "king", WHITE_TYPE))
    result.push(new Piece(0, 4, "queen", WHITE_TYPE))
    result.push(new Piece(0, 5, "bishop", WHITE_TYPE))
    result.push(new Piece(0, 6, "knight", WHITE_TYPE))
    result.push(new Piece(0, 7, "rook", WHITE_TYPE))
    result.push(new Piece(7, 0, "rook", DARK_TYPE))
    result.push(new Piece(7, 1, "knight", DARK_TYPE))
    result.push(new Piece(7, 2, "bishop", DARK_TYPE))
    result.push(new Piece(7, 4, "queen", DARK_TYPE))
    result.push(new Piece(7, 3, "king", DARK_TYPE))
    result.push(new Piece(7, 5, "bishop", DARK_TYPE))
    result.push(new Piece(7, 6, "knight", DARK_TYPE))
    result.push(new Piece(7, 7, "rook", DARK_TYPE))
    for (let k = 0; k < BOARD_SIZE; k++){
        result.push(new Piece(1, k, "pawn", WHITE_TYPE));
        result.push(new Piece(6, k, "pawn", DARK_TYPE));
}


    return result;
  }

function addImage(cell, type, name) {
  const image = document.createElement('img');
  image.src =  type + '/' + name + '.png';
  cell.appendChild(image);
}

function onCellClick(event) {
    if (selectedCell !== undefined) {
      selectedCell.classList.remove('selected');
    }
    selectedCell = event.currentTarget;
    selectedCell.classList.add('selected');
  }

  function onPieceClick(event) {
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

    for (let piece of pieces) {
        addImage(table1.rows[piece.row].cells[piece.col], piece.player, piece.type);
    }
}

window.addEventListener('load', createChessBoard);

