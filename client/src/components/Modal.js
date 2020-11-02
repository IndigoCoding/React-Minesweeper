import React, {useState} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {constant} from "../constant";

const Modal = ({postHighscore, showHighscorePopup, setShowHighscorePopup}) => {
    const [name, setName] = useState(null);
    return(
        <Popup className="highscore-popup" open={showHighscorePopup} modal onClose={()=>{setShowHighscorePopup(false)}}>
            <h2>VICTORY!</h2>
            <form method="POST" onSubmit={(event) => {event.preventDefault(); postHighscore(name);
                setShowHighscorePopup(false);}}>
                <label>Please enter your name: </label><br/>
                <input type="text" onChange={(event) => {setName(event.target.value)}}/><br/>
                <button type="submit">Submit</button>
            </form>
        </Popup>
    );
}

export default Modal;