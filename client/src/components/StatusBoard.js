import React from 'react';
import {constant} from '../constant';

const StatusBoard = ({status, bombCount, elapsedTime}) => {
    return (
        <div>
            <h3>Game Status: {status}</h3>
            <h3>Elapsed Time: {elapsedTime}</h3>
            <h3>Bomb Count: {bombCount} </h3>
        </div>
    )
}

export default StatusBoard;