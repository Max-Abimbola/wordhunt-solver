import React, { useEffect, useState } from 'react';
import '../wordHunterDisplay.css';
import FoundWords from '../components/FoundWords';
import { utilGetNeighbours, utilCheckNeighbours, utilFilterNeighbours, wordInBoard } from '../helpers/wordhunter.cjs';



function WordHunterDisplay() {
  const initialGrid = [
    ["A", "N", "D", "S"],
    ["S", "S", "S", "S"],
    ["S", "S", "S", "S"],
    ["S", "S", "S", "S"]
  ];

  const [grid, setGrid] = useState(initialGrid);
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    fetch('/src/helpers/word-list.txt')
      .then(response => response.text())
      .then(content => {


        const lines = content.split('\n');
        const values = lines.map(line => line.trim());
        setFileContent(values)

      })
      .catch(error => {
        console.error('Error fetching file:', error);
      });
  }, []);
  

  const handleChange = (rowIndex, colIndex, value) => {

    const updatedGrid = [...grid];
    updatedGrid[rowIndex][colIndex] = value.toUpperCase();
    setGrid(updatedGrid);

  };

  function handleClick(e){
    const textArea = document.getElementsByClassName("word-list").value = "fsdf"
    var foundWords = fileContent.filter((word)=>wordInBoard(word,grid) === true)
    console.log(foundWords)
  }

  return (
    <div className='container'>
      <div className='word-hunter-grid-container'>
        <form className='wordHunterGrid'>
          {grid.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((col, colIndex) => (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  type="text"
                  maxLength={1}
                  value={`${grid[rowIndex][colIndex]}`}
                  onChange={e => handleChange(rowIndex, colIndex, e.target.value)}
                />
              ))}
            </div>
          ))}
        </form>
      </div>
      <div className='generate-words-button-container'>
        <button onClick={handleClick} className='generate-words-button'>Generate Words</button>
      </div>
      <div className='found-words-container'>
        <FoundWords />
      </div>
    </div>
  );
}

export default WordHunterDisplay;