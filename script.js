let empty_board = {'a':['', '', '', '', '', '', '', ''],'b':['', '', '', '', '', '', '', ''],'c':['', '', '', '', '', '', '', ''],'d':['', '', '', '', '', '', '', ''],'e':['', '', '', '', '', '', '', ''],'f':['', '', '', '', '', '', '', ''],'g':['', '', '', '', '', '', '', ''],'h':['', '', '', '', '', '', '', '']};

class Board {
  constructor(board_matrix, move_list) {
    this.board_matrix = board_matrix;
    this.move_list = move_list;
  }
  move(piece,destination) {
    this.board_matrix[piece.location[0]][piece.location[1]] = "";
    piece.change_location(destination);
    this.board_matrix[destination[0]][destination[1]] = piece;
  }
  is_king_in_check() {
    //get attacking squares of all pieces. see if any of them attack the other piece
  }
}

class Piece {
  constructor(location, type, color, already_moved=false, previous_piece=false,can_en_passant=false) {
    this.location = location;
    this.type = type;
    this.color = color;
    this.already_moved = already_moved;
    this.previous_piece = previous_piece;
    this.can_en_passant = can_en_passant;
  }
  get_possible_moves(board_matrix) {
    //NOTE: make sure moves don't put king in check
    let possible_moves = [];
    let attacking_squares = this.get_attacking_squares(board_matrix);
    if (this.type == "king") {
      if (!already_moved) {
        //check if it an castle
      }
      if (this.color == "white") {

      } else if (this.color == "black") {
        
      }
    } else if (this.type == "pawn") {
      if (!this.already_moved) {
        //then it can go two squares forward (unless something is blocking it)
        if (this.color == "white") {
          if (this.location[1]+2 < 9) {
            //check if something is in the way
            if (board_matrix[this.location[0]][this.location[1]+1] == '' && board_matrix[this.location[0]][this.location[1]+2] == '') {
              let possible_move = [];
              possible_move.push(this.location[0]);
              possible_move.push(this.location[1]+2);
              possible_moves.push(possible_move);
            }
          }
        } else if (this.color == "black") {
          if (this.location[1]-2 > 0) {
            //check if something is in the way
            if (board_matrix[this.location[0]][this.location[1]-1] == '' && board_matrix[this.location[0]][this.location[1]-2] == '') {
              let possible_move = [];
              possible_move.push(this.location[0]);
              possible_move.push(this.location[1]-2);
              possible_moves.push(possible_move);
            }
          }
        }
      }
      if (this.color == "white") {
        if (this.location[1]+1 < 9) {
          //check if something is in the way
          if (board_matrix[this.location[0]][this.location[1]+1] == '') {
            let possible_move = [];
            possible_move.push(this.location[0]);
            possible_move.push(this.location[1]+1);
            possible_moves.push(possible_move)
          }
        }
      } else if (this.color == "black") {
        if (this.location[1]-1 > 0) {
          //check if something is in the way
          if (board_matrix[this.location[0]][this.location[1]-1] == '') {
            let possible_move = [];
            possible_move.push(this.location[0]);
            possible_move.push(this.location[1]-1);
            possible_moves.push(possible_move)
          }
        }
        //check if it can capture
        for (i=0; i < Object.keys(attacking_squares).length; i++) {
          attacking_squares.push(Object.keys(attacking_squares)[i]);
        }   
      }   
    } else if (this.type == "knight") {
      
    } else if (this.type == "bishop") {
      
    } else if (this.type == "queen") {
      
    } else if (this.type == "rook") {
      
    }
    //iterate throguh squares to check they don't put the king in check
    for (i=0; i < possible_moves.length; i++) {
      let test_board = new Board(board_matrix, []);
      test_board.move(new Piece(this.location, this.type, this.already_moved, this.previous_piece, this.can_en_passant), possible_moves[i]);
      if (test_board.board_matrix.is_king_in_check()) {
        //remove move from possible moves
        possible_moves[i] = undefined;
      }
    }
    return possible_moves
  }
  get_attacking_squares(board_matrix) {
    let attacking_squares = [];
    if (this.type == "king") {
      if (this.color == "white") {

      } else if (this.color == "black") {
        
      }
    } else if (this.type == "pawn") {
      //NOTE: add en passente later
      if (this.color == "white") {
        //make sure we aren't at the last row 
        if (this.location[1] != 8) {
          //check if column is not a side column (meaning pawn cannot capture, because it can;t get off the board)
          if (this.location[0] != "h") {
            let column_index = Object.keys(board_matrix).indexOf(this.location[0])+1;
            let column = Object.keys(board_matrix)[column_index];
            //making sure the square isn't our own piece!
            if (board_matrix[column][this.location[1]].color == "black") {
              attacking_squares.push(column+String(this.location[1]));
            }
            if (board_matrix[column][this.location[1]-1].color == "black" && board_matrix[column][this.location[1]-1].can_en_passant) {
              attacking_squares.push(column+String(this.location[1]+1)+"-en_passant");
            }
          }
          if (this.location[0] != "a") {
            let column = Object.keys(board_matrix)[Object.keys(board_matrix).indexOf(this.location[0])-1];
            if (board_matrix[column][this.location[1]].color == "black") {
              attacking_squares.push(column+String(this.location[1]));
            }
            if (board_matrix[column][this.location[1]-1].color == "black" && board_matrix[column][this.location[1]-1].can_en_passant) {
              attacking_squares.push(column+String(this.location[1]+1)+"-en_passant");
            }
          }
        }
        //check if to the left or the right, there is an enemy pawn. check if en passante is possible on the enemy pawn. if so add to possible moves (add '-en passant' to the end)
      } else if (this.color == "black") {
        if (this.location[1] != 1) {
          //check if column is not a side column (meaning pawn cannot capture, because it can;t get off the board)
          if (this.location[0] != "h") {
            let column = Object.keys(board_matrix)[Object.keys(board_matrix).findIndex(this.location[0])+1];
            if (board_matrix[column][this.location[1]-2].color == "white") {
              attacking_squares.push(column+String(this.location[1]));
            }
            //check for en passant
            if (board_matrix[column][this.location[1]-1].color == "white" && board_matrix[column][this.location[1]-1].can_en_passant) {
              attacking_squares.push(column+String(this.location[1]-1)+"-en_passant");
            }
          }
          if (this.location[0] != "a") {
            let column = Object.keys(board_matrix)[Object.keys(board_matrix).findIndex(this.location[0])-1];
            if (board_matrix[column][this.location[1]-2].color == "white") {
              attacking_squares.push(column+String(this.location[1]));
            }
            if (board_matrix[column][this.location[1]-1].color == "white" && board_matrix[column][this.location[1]-1].can_en_passant) {
              attacking_squares.push(column+String(this.location[1]-1)+"-en_passant");
            }
          }
        }
      }
    } else if (this.type == "knight") {
      
    } else if (this.type == "bishop") {
      
    } else if (this.type == "queen") {
      
    } else if (this.type == "rook") {
      
    }
  }
  change_location(new_location) {
    this.location = new_location;
  }
  promote(new_piece) {
    this.previous_piece = this;
    this.type = new_piece;
  }
}

function create_board() {
  let board = document.getElementById("board");
  //iterate through rows
  let rows = ["a","b","c","d","e","f","g","h"];
  for (i = 8; i > 0; i--) {
    let row = document.createElement('DIV');
    row.id = i;
    row.classList.add("row");
    board.appendChild(row)
    //iterate through columns
    for (j = 0; j < 8; j++) {
      let square_name = rows[j]+String(i);
      let square = document.createElement("DIV");
      square.id = square_name;
      square.classList.add("square"); 
      //figure out if it is a black or white square
      if ((i%2 == 0 && j%2 == 0) || (i%2 != 0 && j%2 != 0)) {
        square.classList.add("white");
      } else {
        square.classList.add("black");
      }
      row.appendChild(square);
    }
  }
}

function setup_board() {
  let pieces = {"white":{"king":"♔","queen":"♕","rook":"♖","bishop":"♗","knight":"♘","pawn":"♙"},"black":{"king":"♚","queen":"♛","rook":"♜","bishop":"♝","knight":"♞","pawn":"♟︎"}};
  let starting_board = empty_board;
  //set up starting board
  starting_board['a'][0] = new Piece(['a',1], 'rook', 'white');
  starting_board['a'][1] = new Piece(['a',2], 'pawn', 'white');
  starting_board['b'][0] = new Piece(['b',1], 'knight', 'white');
  starting_board['b'][1] = new Piece(['b',2], 'pawn', 'white');
  starting_board['c'][0] = new Piece(['c',1], 'bishop', 'white');
  starting_board['c'][1] = new Piece(['c',2], 'pawn', 'white');
  starting_board['d'][0] = new Piece(['d',1], 'queen', 'white');
  starting_board['d'][1] = new Piece(['d',2], 'pawn', 'white');
  starting_board['e'][0] = new Piece(['e',1], 'king', 'white');
  starting_board['e'][1] = new Piece(['e',2], 'pawn', 'white');
  starting_board['f'][0] = new Piece(['f',1], 'bishop', 'white');
  starting_board['f'][1] = new Piece(['f',2], 'pawn', 'white');
  starting_board['g'][0] = new Piece(['g',1], 'knight', 'white');
  starting_board['g'][1] = new Piece(['g',2], 'pawn', 'white');
  starting_board['h'][0] = new Piece(['h',1], 'rook', 'white');
  starting_board['h'][1] = new Piece(['h',2], 'pawn', 'white');

  starting_board['a'][7] = new Piece(['a',8], 'rook', 'black');
  starting_board['a'][6] = new Piece(['a',7], 'pawn', 'black');
  starting_board['b'][7] = new Piece(['b',8], 'knight', 'black');
  starting_board['b'][6] = new Piece(['b',7], 'pawn', 'black');
  starting_board['c'][7] = new Piece(['c',8], 'bishop', 'black');
  starting_board['c'][6] = new Piece(['c',7], 'pawn', 'black');
  starting_board['d'][7] = new Piece(['d',8], 'queen', 'black');
  starting_board['d'][6] = new Piece(['d',7], 'pawn', 'black');
  starting_board['e'][7] = new Piece(['e',8], 'king', 'black');
  starting_board['e'][6] = new Piece(['e',7], 'pawn', 'black');
  starting_board['f'][7] = new Piece(['f',8], 'bishop', 'black');
  starting_board['f'][6] = new Piece(['f',7], 'pawn', 'black');
  starting_board['g'][7] = new Piece(['g',8], 'knight', 'black');
  starting_board['g'][6] = new Piece(['g',7], 'pawn', 'black');
  starting_board['h'][7] = new Piece(['h',8], 'rook', 'black');
  starting_board['h'][6] = new Piece(['h',7], 'pawn', 'black');

  let board = new Board(starting_board,[]);
  //set up the board on website now
  let board_matrix = board.board_matrix;
  for (i=0; i < Object.keys(board_matrix).length; i++) {
    let column = Object.keys(board_matrix)[i]; //(a,b,c,d,e,f,g,h)
    for (j=0; j < board_matrix[column].length; j++) {
      let piece = board_matrix[column][j];
      if (piece != "") {
        let piece_character = pieces[piece.color][piece.type];
        let square = document.getElementById(column+String(j+1));
        square.innerHTML = piece_character;
      } else {
        let square = document.getElementById(column+String(j+1));
        square.innerHTML = "‏‏‎ ‎";
      }
    }
  }
  return board
}

function square_onclick(square) {
  //remove other piece onclicking listeners
  for (i=0; i < Object.keys(board.board_matrix).length; i++) {
    for (j=0; j < 8; j++) {
      let square = board.board_matrix[Object.keys(board.board_matrix)[i]][j];
      if (square.color == current_color) {
        document.getElementById(Object.keys(board.board_matrix)[i]+String(j+1)).removeAttribute("onclick");
      }
    }
  }
  //add listener to this piece maybe for cancel option?
  //BUG: cannot make move
  //get piece from matrix, get possible moves, display them with black circle
  let column = square[0];
  let row = square[1];
  let piece = board.board_matrix[column][row-1];
  //square is own piece, can move it
  let possible_moves = piece.get_possible_moves(board.board_matrix);
  for (i=0; i < possible_moves.length; i++) {
    let possible_move = possible_moves[i];
    possible_move = possible_move[0]+String(possible_move[1]);
    let possible_square = document.getElementById(possible_move);
    //check to see if its a capture or not
    if (possible_square.innerHTML == "‏‏‎ ‎") {
      possible_square.innerHTML = "●";
      possible_square.setAttribute("onclick", "possible_move_onclick('"+String(possible_move)+"', '"+String(square)+"', "+JSON.stringify(possible_moves)+")");
    } else {
      possible_square.classList.add("highlight-piece");
      //add onclick listener to those squares
      possible_square.setAttribute("onclick","possible_move_onclick('"+String(possible_move)+"', '"+String(square)+"', "+JSON.stringify(possible_moves)+")");
    }
  }
}

function possible_move_onclick(to_square, from_square, possible_moves) {
  //remove other onclick listeners
  for (i=0; i < possible_moves.length; i++) {
    let possible_move = possible_moves[i];
    if (possible_move != undefined) {
      possible_move = possible_move[0]+String(possible_move[1]);
      document.getElementById(possible_move).removeAttribute("onclick");
    }
  }
  let column = to_square[0];
  let row = to_square[1]-1;
  let piece = board.board_matrix[from_square[0]][from_square[1]-1];
  board.move(piece,[column, row]);
  moved = true;
  console.log("a")
}

function reconstruct_board() {

}

function waitFor(conditionFunction) {
  const poll = resolve => {
    if(conditionFunction()) resolve();
    else setTimeout(_ => poll(resolve), 400);
  }
  return new Promise(poll);
}