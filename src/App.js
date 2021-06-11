import './App.css';
import Head from "react-document-configuration";
import Border from './Border';

function App() {
  return (
    <div className="app">
      <div id="instructions">Press <i className="keyboard-button">W</i> <i className="keyboard-button">A</i> <i className="keyboard-button">S</i> <i className="keyboard-button">D</i> to play.</div>
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
