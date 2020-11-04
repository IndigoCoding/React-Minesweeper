import React from 'react';
import {constant} from '../constant';

const StatusBoard = ({status, bombCount, elapsedTime}) => {
    return (
        <div className="status-board">
            <span className="game-status">Status: {status}</span>
            <span className="bomb-count">Bombs Remain: {bombCount} </span>
            <span className="elapsed-time">Elapsed Time: {elapsedTime}</span>
        </div>
    )
}

export default StatusBoard;