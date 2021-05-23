import './App.css';
import Border from './Border';
import { useState } from 'react';

function App() {
  const [score, setScore] = useState(0);
  return (
    <div className="app">
      <center>
        <h2>Snake Game</h2>
        <p>Score: {score}</p>
      </center>
      <Border score={score} updateScore={setScore} />
    </div>
  );
}

export default App;
