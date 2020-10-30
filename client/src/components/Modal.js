import React, {useState} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {constant} from "../constant";

const Modal = ({postHighscore, gameStatus}) => {
    const [name, setName] = useState(null);
    const [open, setOpen] = useState(gameStatus === constant.GAME_STATUS_VICTORY);
    return(
        <Popup trigger={open} modal={open}>
            <h2>VICTORY!</h2>
            <form method="POST" onSubmit={(event) => {event.preventDefault(); postHighscore(name); setOpen(false)}}>
                <label>Please enter your name: </label><br/>
                <input type="text" onChange={(event) => {setName(event.target.value)}}/><br/>
                <button type="submit">Submit</button>
            </form>
        </Popup>
    );
}

export default Modal;