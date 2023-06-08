import { useState } from 'react'
import './App.css'
import React from 'react'
import WordHunterDisplay from './components/wordHunterDisplay.jsx'
import BackgroundComponent from './components/BackgroundComponent.jsx'

function App() {
  return (
    <div>
      <BackgroundComponent/>
      <WordHunterDisplay/>
    </div>
  )
}

export default App
