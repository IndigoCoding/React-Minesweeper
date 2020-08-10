import React, {Fragment} from 'react';
import Cell from './Cell';

const Board = ({boardState, onCellLeftClick}) => {
    return (
        <div id="board">
            {boardState.map((row) => {
                return (
                    row.map((cell) => {
                        return (
                            <Fragment key={cell.sortValue}>
                                {cell.index % row.length === 0 && cell.index !== 0 && (<br className="clear"/>)}
                                <Cell key={cell.sortValue} cell={cell} onCellLeftClick={(cell) => onCellLeftClick(cell)}/>
                            </Fragment>
                        );
                    })
                )
            })}
        </div>
    );
}

export default Board;