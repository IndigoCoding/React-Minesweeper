import {constant} from "./constant";

export const initBoardState = (mode, setBoardState, setBombCount, index, firstMove = false) => {
    let boardSize, bombCount;
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
    let tmpBoard = {
        size: boardSize,
        cells: [],
    }

    for(let i = 0; i < boardSize[0] * boardSize[1]; i++){
        tmpBoard.cells[i] = {
            'isBomb': false,
            'sortValue' : (i === index && firstMove) ? 0 : getRandom(boardSize[0] * boardSize[1]),
            'value' : 0,
            'index' : i,
            'display': constant.DISPLAY_BLANK
        };
    }

    tmpBoard.cells.sort((a, b) => b.sortValue - a.sortValue);

    for(let i = 0; i < boardSize[0] * boardSize[1]; i++){
        if(i < bombCount){
            tmpBoard.cells[i].isBomb = true;
        }
    }

    tmpBoard.cells.sort((a, b) => a.index - b.index);
    setBombCount(bombCount);
    let finalBoard = countBombNumber(tmpBoard, boardSize);
    if(!firstMove) {
        setBoardState(finalBoard)
    } else{
        let displayArray = {
            'list': []
        }
        discoverBomb(finalBoard, index, displayArray);
        setBoardState({...finalBoard, 'cells': finalBoard.cells.map((cell) => {
                if(displayArray.list.includes(cell.index)){
                    return {...cell, 'display': constant.DISPLAY_VALUE};
                } else {
                    return cell;
                }
            })});
    }
}

const countBombNumber = (board, boardSize) => {
    for(let i = 0; i < board.cells.length; i++){
        // get adjacent state and update bomb count
        for(let adjY = -1; adjY <= 1; adjY++){
            for(let adjX = -1; adjX <= 1; adjX++){
                let adjCell = adjY * boardSize[1] + adjX + i;
                if(adjCell !== i && adjCell >= 0 && adjCell < board.cells.length && board.cells[adjCell].isBomb
                    && (Math.floor(i /boardSize[1]) + adjY) === Math.floor(adjCell / boardSize[1])){
                    board.cells[i].value += 1;
                }
            }
        }
    }
    return board;
}

const getRandom = (max) => Math.random() * max;

export const discoverBomb = (board, index, displayArray, setStatus = null) => {
    if(board.cells[index].isBomb && setStatus){
        setStatus(constant.GAME_STATUS_LOSE);
    }
    let adjCellList = [];
    for (let adjY = -1; adjY <= 1; adjY++) {
        for (let adjX = -1; adjX <= 1; adjX++) {
            let adjCell = adjY * board.size[1] + adjX + index;
            if (adjCell !== index && adjCell >= 0 && adjCell < board.cells.length
                && (Math.floor(index /board.size[1]) + adjY) === Math.floor(adjCell / board.size[1])) {
                adjCellList.push(adjCell);
            }
        }
    }
    displayArray.list.push(index);
    if(board.cells[index].display === constant.DISPLAY_BLANK) {
        if(board.cells[index].value){
        } else {
            adjCellList.forEach((adjCell) => {
                if(!displayArray.list.includes(adjCell) && board.cells[adjCell].display === constant.DISPLAY_BLANK){
                    discoverBomb(board, adjCell, displayArray, setStatus);
                }
            });
        }
    } else if(board.cells[index].display === constant.DISPLAY_VALUE) {
        let flagCount = 0, bombCount = 0;
        adjCellList.forEach((adjCell) => {
            // if(!displayArray.list.includes(adjCell)){
                if(board.cells[adjCell].display === constant.DISPLAY_FLAG){
                    flagCount += 1;
                }
                if(board.cells[adjCell].isBomb){
                    bombCount += 1;
                }
            // }
        });
        if(flagCount === bombCount){
            adjCellList.forEach((adjCell) => {
                if(board.cells[adjCell].display === constant.DISPLAY_BLANK) {
                    board.cells[adjCell].display = constant.DISPLAY_VALUE;
                    discoverBomb(board, adjCell, displayArray, setStatus);
                }
            })
        }
    }
}
