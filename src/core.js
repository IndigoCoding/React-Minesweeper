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
            'sortValue' : getRandom(boardSize[0] * boardSize[1]),
            'value' : 0,
            'index' : i
        };
    }

    tmpBoard.sort((a, b) => b.sortValue - a.sortValue);

    for(let i = 0; i < boardSize[0] * boardSize[1]; i++){
        if(i < bombCount){
            tmpBoard[i].isBomb = true;
        }
    }

    tmpBoard.sort((a, b) => a.index - b.index);

    while(tmpBoard.length){
        finalBoard.push(tmpBoard.splice(0, boardSize[0]));
    }

    setBoardState(countBombNumber(finalBoard));
}

const countBombNumber = (board) => {
    for(let Y = 0; Y < board.length ; Y++){
        for(let X = 0; X < board[Y].length; X++){
            // get adjacent state and update bomb count
            for(let adjY = -1; adjY <= 1; adjY++){
                for(let adjX = -1; adjX <= 1; adjX++){
                    if(adjY === 0 && adjX === 0){
                        continue;
                    }
                    if(Y - adjY > -1 && Y - adjY < board.length && X - adjX > -1 && X - adjX < board[Y].length && board[Y - adjY][X - adjX].isBomb){
                        board[Y][X].value += 1;
                    }
                }
            }
        }
    }
    return board;
}

const getRandom = (max) => Math.random() * max;


