
import React from 'react'
import { useState} from "react";
import '../wordHunterDisplay.css'
import FoundWords from '../components/FoundWords';
function WordHunterDisplay() {
    const initialGrid = [
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""]
    ];

    const [grid, setGrid] = useState(initialGrid);
    
    const handleChange = (rowIndex,colIndex,value) => {
      const updatedGrid = [...grid];
      updatedGrid[rowIndex][colIndex] = value.toUpperCase();
      setGrid(updatedGrid);
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
                      onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                    />
                  ))}
                </div>
              ))}
              
            </form>
        </div>
        <div className='generate-words-button-container'>
          <button className='generate-words-button' onClick={console.log('GDello')}>Generate Words</button>
        </div>
        <div className='found-words-container'>
          <FoundWords/>
        </div>
      </div>

    );
}
  
export default WordHunterDisplay;