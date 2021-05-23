import './App.css';
import Snake from './Snake';


function Border({ score, updateScore }){
    return(
    <div className="border" id="border">
        <Snake score={score} updateScore={updateScore}/>
    </div>
    )
}

export default Border;