import React, { useEffect, useState, useRef } from 'react';
import '../wordHunterDisplay.css';
import FoundWords from '../components/FoundWords';
import { utilGetNeighbours, utilCheckNeighbours, utilFilterNeighbours, wordInBoard } from '../helpers/wordhunter.cjs';

function WordHunterDisplay() {
  const initialGrid = [
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""]
  ];

  const [grid, setGrid] = useState(initialGrid);
  const [fileContent, setFileContent] = useState([]);
  const [textArea, setTextArea] = useState([]);

  const inputRefs = useRef(Array.from({ length: 16 }, () => React.createRef()));

  useEffect(() => {
    fetch('/src/helpers/word-list.txt')
      .then(response => response.text())
      .then(content => {
        const lines = content.split('\n');
        const values = lines.map(line => line.trim());
        setFileContent(values);
      })
      .catch(error => {
        console.error('Error fetching file:', error);
      });
  }, []);

  const handleChange = (rowIndex, colIndex, value) => {
    const updatedGrid = [...grid];
    updatedGrid[rowIndex][colIndex] = value.toUpperCase();
    setGrid(updatedGrid);

    const nextInputIndex = colIndex < 3 ? (rowIndex * 4) + (colIndex + 1) : (rowIndex + 1) * 4;
    inputRefs.current[nextInputIndex].current.focus();
  };

  function handleClick() {
    const foundWords = fileContent.filter(word => wordInBoard(word, grid));
    setTextArea(foundWords);
  }

  return (
    <div className='container'>
      <div>
        <h1>Wordhunt Solver</h1>
      </div>
      <div className='word-hunter-grid-container'>
        <form className='wordHunterGrid'>
          {grid.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((col, colIndex) => (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  type="text"
                  maxLength={1}
                  value={grid[rowIndex][colIndex]}
                  onChange={e => handleChange(rowIndex, colIndex, e.target.value)}
                  ref={inputRefs.current[(rowIndex * 4) + colIndex]}
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
        <FoundWords words={textArea} />
      </div>
    </div>
  );
}

export default WordHunterDisplay;