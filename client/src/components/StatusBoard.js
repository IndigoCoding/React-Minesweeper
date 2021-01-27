import React from 'react'
import PropTypes from 'prop-types'

const StatusBoard = ({ status, bombCount, elapsedTime }) => {
  return (
    <div className="status-board">
      <span className="game-status">Status: {status}</span>
      <span className="bomb-count">Bombs Remain: {bombCount} </span>
      <span className="elapsed-time">Elapsed Time: {elapsedTime}</span>
    </div>
  )
}

StatusBoard.propTypes = {
  status: PropTypes.string,
  bombCount: PropTypes.number,
  elapsedTime: PropTypes.number
}

export default StatusBoard
