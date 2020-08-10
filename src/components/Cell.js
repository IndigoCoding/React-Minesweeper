import React, {useState, useEffect} from 'react';
import {constant} from "../constant";

const Cell = ({cell, onCellLeftClick}) => {
    const [display, setDisplay] = useState(constant.DISPLAY_BLANK);

    const onCellClick = () => {
        if(!display){
            setDisplay(constant.DISPLAY_VALUE);
            onCellLeftClick(cell);
        }
    }

    useEffect(() => {
        if(!display){
            document.getElementById(cell.index).classList.add('blank');
        } else{
            document.getElementById(cell.index).classList.remove('blank');
        }
    },[display]);

    return (
        <div className="cell" onClick={() => {onCellClick()}}>
            <div id={cell.index}>
                {cell.isBomb ? '*' : cell.value ? cell.value : " "}
            </div>
        </div>
    );
}

export default Cell;