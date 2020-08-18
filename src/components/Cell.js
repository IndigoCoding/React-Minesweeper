import React, {useState, useEffect} from 'react';
import {constant} from "../constant";

const Cell = ({cell, onCellLeftClick, onCellRightClick}) => {
    return (
        <div className={"cell" + (cell.display === constant.DISPLAY_FLAG ? " flagged" : "")}
             onClick={() => onCellLeftClick(cell)}
             onContextMenu={(e) => {e.preventDefault(); onCellRightClick(cell)}}>
            <div id={cell.index} className={cell.display === constant.DISPLAY_VALUE ? "revealed" : "blank"}>
                {cell.isBomb ? '*' : cell.value ? cell.value : " "}
            </div>
        </div>
    );
}

export default Cell;