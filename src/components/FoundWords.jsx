import React from 'react'
import { useState} from "react";
import '../FoundWords.css'
function FoundWords(props){
    return(
            <textarea className='word-list'>
                {props.words} 
            </textarea>
    )
}

export default FoundWords