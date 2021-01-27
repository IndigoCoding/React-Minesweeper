import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import React from 'react'
import HighscoreBoard from './HighscoreBoard'
import PropTypes from 'prop-types'

const HighscoreTab = ({ highscore }) => {
  return (
    <div className="highscore-tab-board">
      <Tabs defaultActiveKey="easy" id="noanim-tab-example">
        <Tab eventKey="easy" title="Easy">
          <HighscoreBoard mode="easy" highscore={highscore}/>
        </Tab>
        <Tab eventKey="intermediate" title="Intermediate">
          <HighscoreBoard mode="intermediate" highscore={highscore}/>
        </Tab>
        <Tab eventKey="expert" title="Expert">
          <HighscoreBoard mode="expert" highscore={highscore}/>
        </Tab>
      </Tabs>
    </div>
  )
}

HighscoreTab.propTypes = {
  highscore: PropTypes.object
}

export default HighscoreTab
