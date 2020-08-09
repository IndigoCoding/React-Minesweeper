import React, {useState, useEffect} from 'react';
import './App.css';
import {initBoardState} from "./core";
import {constant} from "./constant";

function App() {

    const [mode, setMode] = useState(constant.MODE_EASY);
    const [isFirstMove, setIsFirstMove] = useState(true);
    const [bombCount, setBombCount] = useState(constant.MODE_EASY_BOMB_COUNT);
    const [boardState, setBoardState] = useState([]);

    useEffect(() => {
        initBoardState(mode, setBoardState);
    }, [mode]);

    return (
        <div className="App">
        </div>
    );
}

export default App;
