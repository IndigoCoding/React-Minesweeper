import React, {useState, useEffect} from 'react';
import {constant} from "../constant";
import { faBomb, faFlag} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cell = ({cell, onCellLeftClick, onCellRightClick}) => {
    return (
        <div className="cell" id={cell.index}
             onClick={() => onCellLeftClick(cell)}
             onContextMenu={(e) => {e.preventDefault(); onCellRightClick(cell)}}>
            {
                cell.display === constant.DISPLAY_BLANK ? <div className="blank">{" "}</div> :
                    cell.display === constant.DISPLAY_FLAG ? <div className="flagged" ><FontAwesomeIcon icon={faFlag}/></div>:
                        cell.display === constant.DISPLAY_DOUBT ? <div className="doubted" ><FontAwesomeIcon icon={faFlag}/></div>:
                            cell.isBomb ? <div className="flagged" ><FontAwesomeIcon icon={faBomb}/></div> :
                                cell.value ? <div className="revealed">{cell.value}</div> : <div className="revealed">{" "}</div>
            }
        </div>
    );
}

export default Cell;