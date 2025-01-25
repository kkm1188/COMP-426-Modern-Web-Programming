/*
Add your code for Game here
*/
export default class Game{
    constructor(size){
        this.size = size;
        this.area = this.size*this.size;
        this.onWinArr = [];
        this.onLoseArr = [];
        this.onMoveArr= [];
        this.gameState = {
            board: new Array(this.area).fill(0),
            score: 0,
            won: false,
            over: false
          }
          this.setupNewGame()
    }


loadGame(gameState){
this.gameState = gameState;
}

setupNewGame(){
    this.gameState = {
        board: new Array(this.area).fill(0),
        score: 0,
        won: false,
        over: false
      }
    this.gameState.board[randomIndex(this,this.area)] = randomValue();
    this.gameState.board[randomIndex(this,this.area)] = randomValue();
}
onMove(callback){
    let len = this.onMoveArr.length;
    this.onMoveArr[len] = callback;
}
onLose(callback){
    let len = this.onLoseArr.length;
    this.onLoseArr[len] = callback;

}
onWin(callback){
    let len = this.onWinArr.length;
    this.onWinArr[len] = callback;

}
getGameState(){
    return this.gameState;
}

move(direction){
        let rowArr = [];
        let arr = [];
        let move = false;
        // logic to shift values horizontally
        if(direction == "right" || direction == "left"){
            for(let i = 0; i < this.size; i++){
                rowArr = [];
                let j = 0;
                while(j < this.size){
                    let pos = j + (this.size * i);
                    rowArr.push(this.gameState.board[pos]);
                    j++;
                }
                if(direction == "right"){
                    arr = handleRight(rowArr,this.size, this);
                } else if(direction == "left"){
                    arr = handleLeft(rowArr,this.size, this);
                }
                for(let i = 0; i < this.size; i++){
                    for(let j = 0; j < this.size; j++){

                    }
                }
                for(let i = 0; i < arr.length; i++){
                    if(arr[i] == 2048){
                        this.gameState.won = true;
                        for (let i = 0; i < this.onWinArr.length; i++) {
                            this.onWinArr[i](this.gameState);
                        }
                    }
                }
            let k = 0;
            while(k < this.size){
                this.gameState.board[k + (this.size * i)] = arr[k];
                k++;
            }
        }
    }

        // logic to shift values vertically
        if (direction == 'up' || direction == 'down') {
            //i = right
            //j = down
            let rowArr = [];
            let arr = [];
            for(let i = 0; i < this.size; i++){
                rowArr = [];
                let j = 0;
                while(j < this.size){
                    let pos = i + (this.size * j);
                    rowArr.push(this.gameState.board[pos]);
                    j++;
                }
                if(direction == "up"){
                    arr = handleUp(rowArr,this.size, this);
                } else if(direction == "down"){
                    arr = handleDown(rowArr,this.size, this);
                }
            
            for(let i = 0; i < arr.length; i++){
                if(arr[i] == 2048){
                    this.gameState.won = true;
                    for (let i = 0; i < this.onWinArr.length; i++) {
                        this.onWinArr[i](this.gameState);
                    }
                }
            }

            let k = 0;
            while(k < this.size){
                this.gameState.board[i + (this.size * k)] = arr[k];
                k++;
            }
        }
    }  
    this.gameState.board[randomIndex(this,this.area)] = randomValue();

    if(isOver(this.gameState.board)){
        this.gameState.over = true;
        for (let i = 0; i < this.onLoseArr.length; i++) {
            this.onLoseArr[i](this.gameState);
        }
    }
    for (let i = 0; i < this.onMoveArr.length; i++) {
        this.onMoveArr[i](this.gameState);
    }  
}
toString() {
    var output = "";
    for (var i = 0; i < this.gameState.board.length; i++) {
        if (i % this.size == 0) { 
            output = output + '\n';
        }
        if (this.gameState.board[i] == 0) {
            output = output + "[ ]"; 
        } else {
            output = output + "[" + this.gameState.board[i] + "]"; 
        }
    }
    return output;
}

getGameState() {
    return this.gameState;
    }
}
export function isOver(board){
   let size = Math.sqrt(board.length);
    if(!isFull){
        return false;
    }
    if(isFull(board)){
        for(let i = 0; i < board.length; i++){
            //tests right
            if((i + 1)%size != 0){
                if(board[i] == board[i+1]){
                    return false;
                }
            }
            //tests down
            if(i + size < board.length){
                if(board[i] == board[i+size]){
                    return false;
                }
            }
            //tests left
            if(i %size != 0){
                if(board[i] == board[i-1]){
                    return false;
                }
            }
            //tests down
            if((i - size) >= 0){
                if(board[i] == board[i-size]){
                    return false;
                }
            }
        }
        return true;
    }
}

export function isFull(board){
    for(let i = 0; i<board.length; i++){
        if(board[i] == 0){
            return false;
        }
    }
    return true;
}

export function randomIndex(game, size){
    let isFull = true;
    for(let i = 0; i < size; i++){
        if(game.gameState.board[i] == 0){
            isFull = false;
            break;
        }
    }
    if(!isFull){
        let arr = [];
        for(let i = 0; i < game.gameState.board.length; i++){
            if(game.gameState.board[i] == 0){
                arr.push(i);
            }
        }
        let index = Math.floor(Math.random() * Math.floor(arr.length));
        return arr[index];
    }
}
export function randomValue(){
        //chooses random number 0 - 99, 0 - 89 is 2 while 90 - 99 is 4
        let number =  Math.floor(Math.random() * Math.floor(100));
        var value;

        if(number <= 89){
            value = 2;
        } else {
            value = 4;
        }

        return value;
        }
//handle left shift row by row
export function handleRight(rowArr, size, game){
    let arr = [];
    let finished = false;
    let score = 0;

    let i = size - 1;
    while(i >= 0){
        let onlyZeros = true;
        let j = 1;
        //go down line to see if any matches
        while(j <= i){
            if(finished){
                break;
            }
            if(rowArr[i] != 0 && rowArr[i] == rowArr[i-j]){
                onlyZeros = false;
                arr.push(rowArr[i] * 2);
                score += rowArr[i]*2;
                if(i-j-1 == 0){
                    if(rowArr[i-j-1]!=0){
                        arr.push(rowArr[i-j-1]);
                    }
                    finished = true;
                    break;
                }
                if(i-j != 0) {
                    i = i-j;
                    break;
                } else {
                    finished = true;
                    break;
                }
            } else if(i-j == 0 && rowArr[i-j] == 0){
                if(rowArr[i] != 0){
                    arr.push(rowArr[i]);
                }
                break;
            }else if(i-j == 0 && rowArr[i-j] != 0){
                if(rowArr[i] != 0){
                    arr.push(rowArr[i]);
                }
                arr.push(rowArr[i-j]);
                finished = true;
                break;
            }else if(rowArr[i-j] == 0){
                j++;
            } else{
                onlyZeros = false;
                if(rowArr[i] != 0){
                    arr.push(rowArr[i]);
                }
                break;
            }
        }
        if(finished){
            break;
        }
        i--;
    }
        while(arr.length < size){
            arr.push(0);
        }
        game.gameState.score += score;
        return arr.reverse();
    }
export function handleLeft(rowArr, size, game){
    let arr = [];
    let finished = false;
    let onlyZeros = true;
    let score = 0;

    let i = 0;
    while(i < size){
        let j = 1;
        //go down line to see if any matches
        while(i+j < size){
            if(finished){
                onlyZeros = false;
                break;
            }
            if(rowArr[i] != 0 && rowArr[i] == rowArr[i+j]){
                arr.push(rowArr[i] * 2);
                score += rowArr[i]*2;
                if(i+j+1 == size-1){
                    if(rowArr[i+j+1]!=0){
                        arr.push(rowArr[i+j+1]);
                    }
                    finished = true;
                    break;
                }
                if(i+j < size) {
                    i = i+j;
                    break;
                } else {
                    finished = true;
                    break;
                }
            }  else if(i+j == size-1 && rowArr[i+j] == 0){
                if(rowArr[i] != 0){
                    arr.push(rowArr[i]);
                }
                break;
            }else if(i+j == size-1 && rowArr[i+j] != 0){
                if(rowArr[i] != 0){
                    arr.push(rowArr[i]);
                }
                arr.push(rowArr[i+j]);
                finished = true;
                break;
            } else if(rowArr[i+j] == 0){
                j++;
            } else{
                onlyZeros = false;
                if(rowArr[i] != 0){
                    arr.push(rowArr[i]);
                }
                break;
            }
        }
        if(finished){
            break;
        }
        i++;
    }
    while(arr.length < size){
        arr.push(0);
    }
    game.gameState.score += score;
    return arr;
}
export function handleUp(rowArr, size, game){
    let arr = [];
    let finished = false;
    let onlyZeros = true;
    let score = 0;

    let i = 0;
    while(i < size){
        let j = 1;
        //go down line to see if any matches
        while(i+j < size){
            if(finished){
                break;
            }
            if(rowArr[i] != 0 && rowArr[i] == rowArr[i+j]){
                arr.push(rowArr[i] * 2);
                score += rowArr[i]*2;
                if(i+j+1 == size-1){
                    if(rowArr[i+j+1]!=0){
                        arr.push(rowArr[i+j+1]);
                    }
                    finished = true;
                    break;
                }
                if(i+j < size) {
                    i = i+j;
                    break;
                } else {
                    finished = true;
                    break;
                }
            } else if(i+j == size-1 && rowArr[i+j] == 0){
                if(rowArr[i] != 0){
                    arr.push(rowArr[i]);
                }
                break;
            } else if(i+j == size-1 && rowArr[i+j] != 0){
                if(rowArr[i] != 0){
                    arr.push(rowArr[i]);
                }
                arr.push(rowArr[i+j]);
                finished = true;
                break;
            }else if(rowArr[i+j] == 0){
                j++;
            } else {
                onlyZeros = false;
                if(rowArr[i] != 0){
                    arr.push(rowArr[i]);
                }
                break;
            }
        }
        if(finished){
            break;
        }
        i++;
    }  
    while(arr.length < size){
        arr.push(0);
    }
    game.gameState.score += score;
    return arr;
}
export function handleDown(rowArr, size, game){
        let arr = [];
        let finished = false;
        let onlyZeros = true;
        let score = 0;
    
        let i = size - 1;
        while(i >= 0){
            let j = 1;
            //go down line to see if any matches
            while(j <= i){
                if(finished){
                    break;
                }
                if(rowArr[i] != 0 && rowArr[i] == rowArr[i-j]){
                    onlyZeros = false;
                    arr.push(rowArr[i] * 2);
                    score += rowArr[i]*2;
                    if(i-j-1 == 0){
                        if(rowArr[i-j-1]!=0){
                            arr.push(rowArr[i-j-1]);
                        }
                        finished = true;
                        break;
                    }
                    if(i-j != 0) {
                        i = i-j;
                        break;
                    } else {
                        finished = true;
                        break;
                    }
                } else if(i-j == 0 && rowArr[i-j] == 0){
                    if(rowArr[i] != 0){
                        arr.push(rowArr[i]);
                    }
                    finished = true;
                    break;
                } else if(i-j == 0 && rowArr[i-j] != 0){
                    if(rowArr[i]!=0){
                        arr.push(rowArr[i]);
                    }
                    arr.push(rowArr[i-j]);
                    finished = true;
                    break;
                }
                else if(rowArr[i-j] == 0){
                    j++;
                } else{
                    onlyZeros = false;
                    if(rowArr[i] != 0){
                        arr.push(rowArr[i]);
                    }
                    break;
                }
            }
            if(finished){
                break;
            }
            i--;
        }
            while(arr.length < size){
                arr.push(0);
            }
            game.gameState.score += score;
            return arr.reverse();
        }

