import React from 'react';
import {constant} from '../constant';

const ControlBoard = ({setStatus, setMode}) => {
    return (
        <div className="control-board">
            <button onClick={() => {setStatus(constant.GAME_STATUS_NEW)}}>New Game</button>
            <button onClick={() => {
                setMode(constant.MODE_EASY);
                setStatus(constant.GAME_STATUS_NEW);
            }}>Easy</button>
            <button onClick={() => {
                setMode(constant.MODE_INTERMEDIATE);
                setStatus(constant.GAME_STATUS_NEW);
            }}>Intermediate</button>
            <button onClick={() => {
                setMode(constant.MODE_EXPERT);
                setStatus(constant.GAME_STATUS_NEW);
            }}>Expert</button>
        </div>
    )
}

export default ControlBoard;