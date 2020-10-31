import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import {initBoardState, discoverBomb} from "./core";
import {constant} from "./constant";
import Board from './components/Board';
import ControlBoard from "./components/ControlBoard";
import StatusBoard from "./components/StatusBoard";
import HighscoreBoard from "./components/HighscoreBoard";
import Modal from "./components/Modal";

function App() {

    const [mode, setMode] = useState(constant.MODE_EASY);
    const [bombCount, setBombCount] = useState(constant.MODE_EASY_BOMB_COUNT);
    const [boardState, setBoardState] = useState({'size': constant.MODE_EASY_BOARD_SIZE, 'cells': []});
    const [status, setStatus] = useState(constant.GAME_STATUS_NEW);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [highscore, setHighscore] = useState({'easy': [], 'intermediate': [], 'expert': []});
    const [updateHighscore, setUpdateHighscore] = useState(true);
    const [showHighscorePopup, setShowHighscorePopup] = useState(false);

    const onCellLeftClick = (cell) => {
        if(status === constant.GAME_STATUS_NEW){
            setStatus(constant.GAME_STATUS_IN_PROGRESS);
            initBoardState(mode, setBoardState, setBombCount, cell.index, true);
        } else {
            if(cell.display === constant.DISPLAY_VALUE || cell.display === constant.DISPLAY_BLANK) {
                if (cell.isBomb) {
                    setStatus(constant.GAME_STATUS_LOSE);
                } else {
                    let displayArray = {
                        'list': []
                    }
                    discoverBomb(boardState, cell.index, displayArray, setStatus);
                    setBoardState({
                        ...boardState, 'cells': boardState.cells.map((cell) => {
                            if (displayArray.list.includes(cell.index)) {
                                return {...cell, 'display': constant.DISPLAY_VALUE};
                            } else {
                                return cell;
                            }
                        })
                    });
                }
            } else if (cell.display === constant.DISPLAY_DOUBT){
                if (cell.isBomb) {
                    setStatus(constant.GAME_STATUS_LOSE);
                } else {
                    setBoardState({...boardState, 'cells': boardState.cells.map((c) => {
                            return (c.index === cell.index) ? {...cell, 'display': constant.DISPLAY_VALUE} : cell;
                        })})
                }
            }
        }

    };

    const onCellRightClick = (cell) => {
        if(status !== constant.GAME_STATUS_NEW){
            let nextDisplay;
            switch(cell.display){
                case constant.DISPLAY_BLANK:
                    nextDisplay = constant.DISPLAY_FLAG;
                    setBombCount(bombCount - 1);
                    break;
                case constant.DISPLAY_FLAG:
                    nextDisplay = constant.DISPLAY_DOUBT;
                    setBombCount(bombCount + 1);
                    break;
                case constant.DISPLAY_DOUBT:
                    nextDisplay = constant.DISPLAY_BLANK;
                    break;
                default:
                    nextDisplay = null;
            }
            if(nextDisplay !== null) {
                setBoardState({
                    ...boardState, 'cells': boardState.cells.map((c) => {
                        return c.index === cell.index ? {...c, 'display': nextDisplay} : c;
                    })
                })
            }
        }
    }

    const checkWinningCondition = () => {
        let win = true;
        boardState.cells.forEach((cell) => {
            if(cell.display !== constant.DISPLAY_VALUE && !cell.isBomb){
                win = false;
            }
        });
        if(win){
            setStatus(constant.GAME_STATUS_VICTORY);
        }
    }

    const postHighscore = (name) => {
        let textMode = mode === constant.MODE_EASY ? 'easy' :
            mode === constant.MODE_INTERMEDIATE ? 'intermediate' :
            mode === constant.MODE_EXPERT ? 'expert' : null;
        axios.post('http://localhost:3000/highscore', {name, score: elapsedTime, mode: textMode})
            .then((res) => {
                if(res.data.status){
                    let newHighscore = {...highscore};
                    newHighscore[textMode] = res.data.response;
                    setHighscore(newHighscore);
                }
            });
    }

    useEffect(() => {
        if(status === constant.GAME_STATUS_NEW) {
            initBoardState(mode, setBoardState, setBombCount, null);
            setElapsedTime(0);
        } else if(status === constant.GAME_STATUS_IN_PROGRESS) {
            setTimeout(() => {
                setElapsedTime(elapsedTime + 1)
            }, 1000)
        }
    }, [mode, status]);

    useEffect(() => {
        if(status === constant.GAME_STATUS_IN_PROGRESS){
            checkWinningCondition();
        }
    }, [boardState]);

    useEffect(() => {
        if(status === constant.GAME_STATUS_IN_PROGRESS) {
            setTimeout(() => {
                setElapsedTime(elapsedTime + 1)
            }, 1000)
        }
    }, [elapsedTime]);

    useEffect(() => {
        if(status === constant.GAME_STATUS_LOSE){
            // reveal and disable the board
            setBoardState({...boardState, 'cells': boardState.cells.map((cell) => {
                if(cell.display === constant.DISPLAY_BLANK) {
                    return {...cell, 'display': constant.DISPLAY_VALUE}
                } else {
                    return cell;
                }
            })})
        }
        if(status === constant.GAME_STATUS_VICTORY){
            setShowHighscorePopup(true);
        }
    }, [status])

    useEffect(() => {
        if(updateHighscore){
            setUpdateHighscore(false);
            let newHighscore = {...highscore};
            axios.get(`http://localhost:3000/highscore?mode=easy`)
                .then(res => {
                    if(res.data.status){
                        newHighscore.easy = res.data.response;
                        axios.get(`http://localhost:3000/highscore?mode=intermediate`)
                            .then(res => {
                                if(res.data.status){
                                    newHighscore.intermediate = res.data.response;
                                    axios.get(`http://localhost:3000/highscore?mode=expert`)
                                        .then(res => {
                                            if(res.data.status){
                                                newHighscore.expert = res.data.response;
                                                setHighscore(newHighscore);
                                            }
                                        })
                                }
                            })
                    }
                })
        }
    })

    return (
        <div className="App">
            <h1>Minesweeper Version {process.env.REACT_APP_VERSION}</h1>
            <StatusBoard status={status} bombCount={bombCount} elapsedTime={elapsedTime}/>
            <div className="main-horizontal">
                <ControlBoard setStatus={(status) => setStatus(status)}
                              setMode ={(mode) => setMode(mode)}/>
                <Board boardState={boardState}
                       gameStatus={status}
                       onCellLeftClick={(cell) => onCellLeftClick(cell)}
                       onCellRightClick={(cell) => onCellRightClick(cell)}/>
                <div className="highscore-board">
                    <HighscoreBoard mode="easy" highscore={highscore}/>
                    <HighscoreBoard mode="intermediate" highscore={highscore}/>
                    <HighscoreBoard mode="expert" highscore={highscore}/>
                </div>
            </div>
            <Modal postHighscore={(name) => postHighscore(name)} showHighscorePopup={showHighscorePopup}
                setShowHighscorePopup={(v) => {setShowHighscorePopup(v)}}/>
        </div>
    );
}

export default App;
