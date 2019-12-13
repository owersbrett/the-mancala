

class Mancala{

    constructor(playerOne, playerTwo){
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.gameOver = true;
        this.playerOneBoard = [];
        this.playerTwoBoard = [];
        this.gameBoard = [];
    }

    getGameBoard(){
        this.gameBoard = this.playerOneBoard.concat(this.playerTwoBoard);
    }

    resetGame(){
        this.gameOver = false;
        this.coinFlip();
        this.startGame();
    }
    
    startGame(){
        this.gameBoard = [0, 4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4];
        while (!this.gameOver){
            this.pickCup(this.checkTurn());
            this.gameOverCheck();
        }
    }

    gameOverCheck(){
        if (this.gameBoard === [/[0-99]/, 0, 0, 0, 0, 0, 0, /[0-99]/, 0, 0, 0, 0, 0, 0]){
            this.gameOver = true;
        }
    }

    checkTurn(){
        return this.playerOne.myTurn ? this.playerOne : this.playerTwo;
    }

    pickCup(player){
        if (player == this.playerOne){
            //event listener based on this.playerOneBoard
        } else {
            //event listener based on this.playerTwoBoard
        }
        let a = 2;
        let myChoice = a; // a is going to be 2, a global variable, and the third cup
        let cupsToFill = [];
        let cupsFilled = [];
        let movingStones = this.gameBoard[myChoice];
        this.gameBoard[myChoice] = 0;
        cupsToFill = this.gameBoard.slice(3,6);
        cupsFilled = cupsToFill.map(cup =>{
            while (movingStones > 0) {
                movingStones -= 1;
                return cup += 1;
            }
        });
        this.gameBoard.splice(cupsFilled.length, 0, cupsFilled);
        console.log(this.gameBoard);

    }

    coinFlip(){
        if(Math.floor(Math.random() * 2) === 0){
            this.playerOne.myTurn = true;
        } else {
            this.playerTwo.myTurn = true;
        }
    };



}


class Player{
    constructor(name){
        this.name = name;
        this.myTurn = false;
    }
}

let brett = new Player('Brett');
let jason = new Player('Jason');

let arrayMancala = new Mancala(brett, jason);

arrayMancala.resetGame();

console.log(arrayMancala.playerOne);
console.log(arrayMancala.gameBoard);



const inquirer = require('inquirer')

var questions = [{
    type: 'input',
    name: 'name',
    message: "What's your name?"
}]

inquirer.prompt(questions).then(answers => {
    console.log(`Hi ${answers['name']}!`)
})

