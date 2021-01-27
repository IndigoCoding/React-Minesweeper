import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import explosion from '../assets/explosion.jpg'

const Modal = ({ postHighscore, showPopup, setShowPopup }) => {
  const [name, setName] = useState(null)
  if (showPopup === 1) {
    return (
      <Popup className="highscore-popup" open={showPopup !== 0} modal onClose={() => { setShowPopup(0) }}>
        <h2>VICTORY!</h2>
        <form method="POST" onSubmit={(event) => {
          event.preventDefault(); postHighscore(name)
          setShowPopup(0)
        }}>
          <label>Please enter your name: </label><br/>
          <input type="text" onChange={(event) => { setName(event.target.value) }}/><br/>
          <button type="submit">Submit</button>
        </form>
      </Popup>
    )
  } else {
    return (
      <Popup className="defeat-popup" open={showPopup !== 0} modal onClose={() => { setShowPopup(0) }}>
        <img src={explosion} alt=""/>
      </Popup>
    )
  }
}

export default Modal
