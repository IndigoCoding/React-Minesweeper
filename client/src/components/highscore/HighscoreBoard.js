import React from 'react'
import PropTypes from 'prop-types'

const HighscoreBoard = ({ mode, highscore }) => {
  return (
    <div id={'highscore-board-' + mode}>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {
            highscore[mode]
              ? highscore[mode].map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.score}</td>
                    <td>{data.date}</td>
                  </tr>
                )
              })
              : <tr></tr>
          }
        </tbody>
      </table>
    </div>
  )
}

HighscoreBoard.propTypes = {
  mode: PropTypes.string,
  highscore: PropTypes.object
}

export default HighscoreBoard
