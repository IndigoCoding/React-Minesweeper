import {constant} from "./constant";

export const initBoardState = (mode, setBoardState) => {
    let boardSize, bombCount;
    let tmpBoard = [], finalBoard = [];
    switch(mode){
        case constant.MODE_INTERMEDIATE:
            boardSize = constant.MODE_INTERMEDIATE_BOARD_SIZE;
            bombCount = constant.MODE_INTERMEDIATE_BOMB_COUNT;
            break;
        case constant.MODE_EXPERT:
            boardSize = constant.MODE_EXPERT_BOARD_SIZE;
            bombCount = constant.MODE_EXPERT_BOMB_COUNT;
            break;
        case constant.MODE_EASY:
        default:
            boardSize = constant.MODE_EASY_BOARD_SIZE
            bombCount = constant.MODE_EASY_BOMB_COUNT;
    }

    for(let i = 0; i < boardSize[0] * boardSize[1]; i++){
        tmpBoard[i] = {
            'isBomb': false,
            'value' : getRandom(boardSize[0] * boardSize[1]),
            'index' : i
        };
    }

    tmpBoard.sort((a, b) => b.value - a.value);

    for(let i = 0; i < boardSize[0] * boardSize[1]; i++){
        if(i < bombCount){
            tmpBoard[i].isBomb = true;
        }
    }

    tmpBoard.sort((a, b) => a.index - b.index);

    while(tmpBoard.length){
        finalBoard.push(tmpBoard.splice(0, boardSize[0]));
    }

    console.log(finalBoard);
    setBoardState(finalBoard);
}

const getRandom = (max) => Math.random() * max;


