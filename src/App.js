import React, { useState } from "react";
import './App.css';
import {Quiz} from './Quiz'

function App() {
  const [start, setStart] = useState(false)
  const mainData = (
    <div className="start">
      <p>Hi, Welcome to the assignment</p>
      <h2>Portuguse Conjugation Game (M C Q)</h2>
      <button onClick={() => {setStart(!start) }}>Lets Begin</button>
    </div>
  )
  return (
    <div className="App">
     {start ? <Quiz/> : mainData}
    </div>
  );
}

export default App;
