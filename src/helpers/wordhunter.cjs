
export function utilGetNeighbours(boardMatrix, row, col) {
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

export function utilCheckNeighbours(row, col, word, boardMatrix, seenLetters, wordIndex = 0) {
  if (wordIndex === word.length) {
    return true;
  } else {
    let neighbours = utilGetNeighbours(boardMatrix, row, col);
    neighbours = utilFilterNeighbours(neighbours, seenLetters);

    for (let i = 0; i < neighbours.length; i++) {
      const neighbourRow = neighbours[i][0];
      const neighbourCol = neighbours[i][1];

      if (boardMatrix[neighbourRow][neighbourCol] === word[wordIndex]) {
        const newSeenLetters = [...seenLetters];
        const seenLetter = [neighbourRow, neighbourCol];
        newSeenLetters.push(seenLetter);

        if (utilCheckNeighbours(neighbourRow, neighbourCol, word, boardMatrix, newSeenLetters, wordIndex + 1)) {
          return true;
        }
      }
    }

    return false;
  }
}

export function utilFilterNeighbours(x, y) {
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

export function wordInBoard(word,boardMatrix) {
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

/* 
let presentWords = values.filter((word)=>wordInBoard(word) === true)


x = ['ABACTINAL','ABAFT']

y = x.filter((word)=>wordInBoard(word) === true)

console.log(presentWords) */

