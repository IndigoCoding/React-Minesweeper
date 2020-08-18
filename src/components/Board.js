import React, {Fragment} from 'react';
import Cell from './Cell';
import {constant} from "../constant";

const Board = ({boardState, gameStatus, onCellLeftClick, onCellRightClick}) => {
    return (
        <div id="board" disabled={gameStatus === constant.GAME_STATUS_LOSE}>
            {
                boardState.cells.map((cell) => {
                    return (
                        <Fragment key={cell.sortValue}>
                            {cell.index % boardState.size[1] === 0 && cell.index !== 0 && (<br/>)}
                            <Cell key={cell.sortValue}
                                  cell={cell}
                                  onCellLeftClick={(cell) => onCellLeftClick(cell)}
                                  onCellRightClick={(cell) => onCellRightClick(cell)}/>
                        </Fragment>
                    );
                })
            }
        </div>
    );
}

export default Board;