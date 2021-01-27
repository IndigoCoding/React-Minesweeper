import React, { Fragment } from 'react'
import Cell from './Cell'
import { constant } from '../constant'
import PropTypes from 'prop-types'

const Board = ({ boardState, gameStatus, onCellLeftClick, onCellRightClick }) => {
  return (
    <div id="board" disabled={gameStatus === constant.GAME_STATUS_LOSE || gameStatus === constant.GAME_STATUS_VICTORY}>
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
          )
        })
      }
    </div>
  )
}

Board.propTypes = {
  boardState: PropTypes.object,
  gameStatus: PropTypes.string,
  onCellLeftClick: PropTypes.func,
  onCellRightClick: PropTypes.func
}

export default Board
