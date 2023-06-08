

const fs = require('fs')

const fileContent = fs.readFileSync('word-list.txt','utf-8')

const lines = fileContent.split('\n')

const values = lines.map((line)=>line.trim())

console.log(values)


const boardMatrix = [
  ['B', 'L', 'E', 'O'],
  ['G', 'I', 'H', 'N'],
  ['T', 'S', 'I', 'C'],
  ['G', 'R', 'E', 'E']
];

function utilGetNeighbours(boardMatrix, row, col) {
  const neighbours = [];
  const coords = [
    [0, 1],
    [0, -1],
    [1, 0],
    [1, 1],
    [1, -1],
    [-1, 0],
    [-1, 1],
    [-1, -1]
  ];
  for (let i = 0; i < coords.length; i++) {
    const newRow = row + coords[i][0];
    const newCol = col + coords[i][1];

    if (
      newRow >= 0 &&
      newRow < boardMatrix.length &&
      newCol >= 0 &&
      newCol < boardMatrix[0].length
    ) {
      neighbours.push([newRow, newCol]);
    }
  }

  return neighbours;
}

function utilCheckNeighbours(row, col, word, boardMatrix, seenLetters) {
  if (word.length === 0) {
    return true;
  } else {
    let neighbours = utilGetNeighbours(boardMatrix, row, col);
    neighbours = utilFilterNeighbours(neighbours, seenLetters);

    for (let i = 0; i < neighbours.length; i++) {
      const neighbourRow = neighbours[i][0];
      const neighbourCol = neighbours[i][1];

      if (boardMatrix[neighbourRow][neighbourCol] === word[0]) {
        const seenLetter = [neighbourRow, neighbourCol];
        seenLetters.push(seenLetter);

        word = word.slice(1);
        if (utilCheckNeighbours(neighbourRow, neighbourCol, word, boardMatrix, seenLetters)) {
          return true;
        }
        word = word.slice(-1) + word;
        seenLetters.pop();
      }
    }

    return false;
  }
}

function utilFilterNeighbours(x, y) {
  for (let i = 0; i < y.length; i++) {
    for (let j = 0; j < x.length; j++) {
      if (x[j][0] === y[i][0] && x[j][1] === y[i][1]) {
        x.splice(j, 1);
        break; // Exit the inner loop after removing the element
      }
    }
  }
  return x;
}

function wordInBoard(word) {
  for (let row = 0; row < boardMatrix.length; row++) {
    for (let col = 0; col < boardMatrix[0].length; col++) {
      if (boardMatrix[row][col] === word[0]) {
        if (utilCheckNeighbours(row, col, word.slice(1), boardMatrix, [[row, col]])) {
          return true;
        }
      }
    }
  }
  return false;
}


let presentWords = values.filter((word)=>wordInBoard(word) === true)


x = ['ABACTINAL','ABAFT']

y = x.filter((word)=>wordInBoard(word) === true)

console.log(presentWords)