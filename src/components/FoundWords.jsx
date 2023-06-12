import React from 'react';
import '../FoundWords.css';

function FoundWords(props) {
  let words = [];
  
  if (Array.isArray(props.words)) {
    words = props.words;
  }

  return (
    <textarea readOnly value={words.join('\n')} className='word-list'></textarea>
  );
}

export default FoundWords;