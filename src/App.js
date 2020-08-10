import React, {useState, useEffect} from 'react';
import './App.css';
import {initBoardState} from "./core";
import {constant} from "./constant";
import Board from './components/Board';

function App() {

    const [mode, setMode] = useState(constant.MODE_EASY);
    const [bombCount, setBombCount] = useState(constant.MODE_EASY_BOMB_COUNT);
    const [boardState, setBoardState] = useState([]);
    const [status, setStatus] = useState(false);

    const onCellLeftClick = (cell) => {
        if(status === constant.GAME_STATUS_NEW){
            setStatus(constant.GAME_STATUS_IN_PROGRESS);
        }
        if(cell.isBomb){
            setStatus(constant.GAME_STATUS_LOSE);
        } else{

        }
    };

    useEffect(() => {
        initBoardState(mode, setBoardState);
    }, [mode]);

    useEffect(() => {
        console.log(bombCount);
    }, [bombCount])

    useEffect(() => {
        if(status === constant.GAME_STATUS_LOSE){
            // reveal and disable the board
            Array.from(document.getElementsByClassName('blank')).forEach((el) => {
                el.classList.remove('blank');
            })
            document.getElementById('board').setAttribute('disabled', 'true');
        } else if (status === constant.GAME_STATUS_NEW){
            Array.from(document.getElementsByClassName('cell')).forEach((el) => {
                el.firstChild.classList.add('blank');
            })
            document.getElementById('board').removeAttribute('disabled');
        }
    }, [status])

    return (
        <div className="App">
            <h1>Minesweeper Version {process.env.REACT_APP_VERSION}</h1>
            <h3>Status: {status}</h3>
            <button onClick={() => {setStatus(constant.GAME_STATUS_NEW)}}>New Game</button>
            <Board boardState={boardState} onCellLeftClick={(cell) => {onCellLeftClick(cell)}}/>
        </div>
    );
}

export default App;
