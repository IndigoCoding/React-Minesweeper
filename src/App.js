import React, {useState, useEffect} from 'react';
import './App.css';
import {initBoardState, discoverBomb} from "./core";
import {constant} from "./constant";
import Board from './components/Board';

function App() {

    const [mode, setMode] = useState(constant.MODE_EASY);
    const [bombCount, setBombCount] = useState(constant.MODE_EASY_BOMB_COUNT);
    const [boardState, setBoardState] = useState({'size': constant.MODE_EASY_BOARD_SIZE, 'cells': []});
    const [status, setStatus] = useState(constant.GAME_STATUS_NEW);

    const onCellLeftClick = (cell) => {
        if(status === constant.GAME_STATUS_NEW){
            setStatus(constant.GAME_STATUS_IN_PROGRESS);
        }
        if(cell.isBomb){
            setStatus(constant.GAME_STATUS_LOSE);
        } else {
            let displayArray = {
                'list': []
            }
            discoverBomb(boardState, cell.index, displayArray, (status) => setStatus(status));
            setBoardState({...boardState, 'cells': boardState.cells.map((cell) => {
                    if(displayArray.list.includes(cell.index)){
                        return {...cell, 'display': constant.DISPLAY_VALUE};
                    } else {
                        return cell;
                    }
            })})
        }
    };

    const onCellRightClick = (cell) => {
        if(status !== constant.GAME_STATUS_NEW){
            setBoardState({...boardState, 'cells': boardState.cells.map((c) => {
                return c.index === cell.index ? {...c, 'display': constant.DISPLAY_FLAG} : c;
            })})
        }
    }

    useEffect(() => {
        if(status === constant.GAME_STATUS_NEW) {
            initBoardState(mode, setBoardState);
        }
    }, [mode, status]);

    useEffect(() => {
        console.log(bombCount);
    }, [bombCount])

    useEffect(() => {
        if(status === constant.GAME_STATUS_LOSE){
            // reveal and disable the board
            setBoardState({...boardState, 'cells': boardState.cells.map((cell) => ({
                    ...cell, 'display': constant.DISPLAY_VALUE}))
            })
        }
    }, [status])

    return (
        <div className="App">
            <h1>Minesweeper Version {process.env.REACT_APP_VERSION}</h1>
            <h3>Status: {status}</h3>
            <button onClick={() => {setStatus(constant.GAME_STATUS_NEW)}}>New Game</button>
            <Board boardState={boardState}
                   gameStatus={status}
                   onCellLeftClick={(cell) => onCellLeftClick(cell)}
                   onCellRightClick={(cell) => onCellRightClick(cell)}/>
        </div>
    );
}

export default App;
