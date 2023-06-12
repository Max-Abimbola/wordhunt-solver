import React from 'react'
import { useState} from "react";
import '../FoundWords.css'
function FoundWords(props){
    return(
            <textarea readonly='yes' value={props.words} className='word-list'>
            </textarea>
    )
}

export default FoundWords