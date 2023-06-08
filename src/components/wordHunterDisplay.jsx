
import React from 'react'
import { useState} from "react";
import '../wordHunterDisplay.css'

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
      updatedGrid[rowIndex][colIndex] = value;
      setGrid(updatedGrid);
    }
    return (
      <div className='wordHunterGrid'>
        <form>
          {grid.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((col, colIndex) => (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  type="text"
                  onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                />
              ))}
            </div>
          ))}
          <button>Generate Words</button>
        </form>
      </div>
    );
}
  
export default WordHunterDisplay;