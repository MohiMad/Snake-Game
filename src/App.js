import './App.css';
import Head from "react-document-configuration";
import Border from './Border';

function App() {
  return (
    <div className="app">
      <div id="instructions">Press <a className="keyboard-button">W</a> <a className="keyboard-button">A</a> <a className="keyboard-button">S</a> <a className="keyboard-button">D</a> to play.</div>
      <Head title="Snake Game" icon=""/>
      <center>
        <h2>Snake Game</h2>
        <p className="score">Score: 0</p>
      </center>
      <Border/>
    </div>
  );
}

export default App;
