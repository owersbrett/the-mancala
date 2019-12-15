document.getElementById('start-game').onclick = function() {
    // let gameOver = false; // will need later
    resetGame();
    setAllCupValues(4);  
    let theCoin = coinFlip();
    disableButtons(theCoin);
};

document.getElementById('start-over').addEventListener("click", resetGame);

function resetGame() {
    setAllCupValues(0);
    document.getElementById("cup-0").dataset.stones = 0;
    document.getElementById("cup-0").innerHTML = 0;     //i wont need when i have graphics
    document.getElementById("cup-7").dataset.stones = 0;
    document.getElementById("cup-7").innerHTML = 0;     //i wont need when i have graphics
    document.getElementById("playerOne").dataset.turn = "false";
    document.getElementById("playerTwo").dataset.turn = "false";
    
}
function setAllCupValues(val) {
    for(let cup = 1; cup <= 6; cup++) {
        let cupId = "cup-" + cup;
        document.getElementById(cupId).dataset.stones = val;
        document.getElementById(cupId).innerHTML = val;
    }
    for(let cup = 8; cup <= 13; cup++) {
        let cupId = "cup-" + cup;
        document.getElementById(cupId).dataset.stones = val;
        document.getElementById(cupId).innerHTML = val;
    }
}

function coinFlip(){
    let coin = Math.ceil(Math.random() * 2);
    return coin;
}

function disableButtons(player){
    if (player === 1){
        for (let i = 1; i <= 6; i++){
            document.getElementById("cup-" + i).disabled = true;
        }
        for (let i = 8; i <= 13; i++){
            document.getElementById("cup-" + i).disabled = false;
        }
    } 
    if (player === 2){
        for (let i = 1; i <= 6; i++){
            document.getElementById("cup-" + i).disabled = false;
        }
        for (let i = 8; i <= 13; i++){
            document.getElementById("cup-" + i).disabled = true;
        }
        
    }
}

function checkForGameOver(){                    // every round, this must occur
    let playerOneEmptyCups = 0;
    let playerTwoEmptyCups = 0;
    let isGameOver = true;     //this will need to change
    for (let i = 0; i < 6; i++){
        if (playerOneBoard[i].innerHTML === 0){
            playerOneEmptyCups += 1;
        }
        if (playerTwoBoard[i].innerHTML === 0){
            playerTwoEmptyCups += 1;
        }
    }
    // console.log(playerOneEmptyCups);
    if (playerOneEmptyCups === 6 || playerTwoEmptyCups === 6){
        isGameOver = true;
    }
    return isGameOver;
}

function moveStones(e) {
    let stonesToDisperse = parseInt(e.target.innerHTML);    // log the stones to disperse
    resetCup(e);                                            // empties both visually and dataset which stores stones
    let check = 0;                                          // this check will change later on if we reach the thirteenth cup. it is also reset if someone clicks a cup
    addToCups(e, stonesToDisperse, check);
}

function resetCup(e) {
    e.target.innerHTML = 0;
    e.target.dataset.stones = 0;
}

function addToCup(whichCup) {  
    let currentCup = document.getElementById(whichCup);     //this is when i determined how to effectively refactor

}

function addToCups(e, stonesToDrop, check) {
    let deacc = stonesToDrop;                               // this will decrease as the stones are dropped
    let currentCup = "";                                    // this will be assigned to whichever cup is getting a new stone
    let theCheck = check;                                   // may not need this, will test
    let theSwitch = (theCheck === 0 ? e.target.id : "cup-0");   // this will determine where the cups begin to disperse
    
    if (stonesToDrop !== 0){                                // if we're out of stones, stop doing things

        switch (theSwitch){                                 // start here after cup 13. this is also a score cup
            case "cup-0":
                if (deacc === 0){
                    break;
                }
                if (theSwitch == "cup-0") {
                    currentCup = document.getElementById("cup-0");
                    currentCup.dataset.stones = 1 + parseInt(currentCup.dataset.stones);
                    currentCup.innerHTML = currentCup.dataset.stones;
                    deacc -= 1;
                }
            case "cup-1":
                if (deacc === 0){
                    break;
                }
                if (theSwitch !== "cup-1") {
                    currentCup = document.getElementById("cup-1");
                    currentCup.dataset.stones = 1 + parseInt(currentCup.dataset.stones);
                    currentCup.innerHTML = currentCup.dataset.stones;
                    deacc -= 1;
                    if (deacc === 0 && ((document.getElementById("cup-1").dataset.stones === 0) && document.getElementById("cup-13".dataset.stones !== 0))){
                        let addThese = parseInt(document.getElementById("cup-1").dataset.stones) + parseInt(document.getElementById("cup-13").dataset.stones);
                        let toThis = parseInt(document.getElementById("cup-7").dataset.stones);
                        document.getElementById("cup-1").dataset.stones = 0;
                        document.getElementById("cup-13").dataset.stones = 0;
                        document.getElementById("cup-1").dataset.innerHTML = 0;
                        document.getElementById("cup-13").dataset.innerHTML = 0;
                        document.getElementById("cup-7").dataset.stones = addThese + toThis;
                        document.getElementById("cup-7").innerHTML = addThese + toThis;
                    } else {
                        switchTurns();
                    }
                }
            case "cup-2":
                if (deacc === 0){
                    break;
                }
                if (theSwitch !== "cup-2") {
                    currentCup = document.getElementById("cup-2");
                    currentCup.dataset.stones = 1 + parseInt(currentCup.dataset.stones);
                    currentCup.innerHTML = currentCup.dataset.stones;
                    deacc -= 1;
                    if (deacc === 0 && ((document.getElementById("cup-2").dataset.stones === 0) && document.getElementById("cup-12".dataset.stones !== 0))){
                        let addThese = parseInt(document.getElementById("cup-2").dataset.stones) + parseInt(document.getElementById("cup-12").dataset.stones);
                        let toThis = parseInt(document.getElementById("cup-7").dataset.stones);
                        document.getElementById("cup-2").dataset.stones = 0;
                        document.getElementById("cup-12").dataset.stones = 0;
                        document.getElementById("cup-2").dataset.innerHTML = 0;
                        document.getElementById("cup-12").dataset.innerHTML = 0;
                        document.getElementById("cup-7").dataset.stones = addThese + toThis;
                        document.getElementById("cup-7").innerHTML = addThese + toThis;
                    } else {
                        switchTurns();
                    }
                }
            case "cup-3":
                if (deacc === 0){
                    break;
                }
                if (theSwitch !== "cup-3") {
                    currentCup = document.getElementById("cup-3");
                    currentCup.dataset.stones = 1 + parseInt(currentCup.dataset.stones);
                    currentCup.innerHTML = currentCup.dataset.stones;
                    deacc -= 1;
                    if (deacc === 0 && ((document.getElementById("cup-3").dataset.stones === 0) && document.getElementById("cup-11".dataset.stones !== 0))){
                        let addThese = parseInt(document.getElementById("cup-3").dataset.stones) + parseInt(document.getElementById("cup-11").dataset.stones);
                        let toThis = parseInt(document.getElementById("cup-7").dataset.stones);
                        document.getElementById("cup-3").dataset.stones = 0;
                        document.getElementById("cup-11").dataset.stones = 0;
                        document.getElementById("cup-3").dataset.innerHTML = 0;
                        document.getElementById("cup-11").dataset.innerHTML = 0;
                        document.getElementById("cup-7").dataset.stones = addThese + toThis;
                        document.getElementById("cup-7").innerHTML = addThese + toThis;
                    } else {
                        switchTurns();
                    }
                }
            case "cup-4":
                if (deacc === 0){
                    break;
                }
                if (theSwitch !== "cup-4") {
                    currentCup = document.getElementById("cup-4");
                    currentCup.dataset.stones = 1 + parseInt(currentCup.dataset.stones);
                    currentCup.innerHTML = currentCup.dataset.stones;
                    deacc -= 1;
                    if (deacc === 0 && ((document.getElementById("cup-4").dataset.stones === 0) && document.getElementById("cup-10".dataset.stones !== 0))){
                        let addThese = parseInt(document.getElementById("cup-4").dataset.stones) + parseInt(document.getElementById("cup-10").dataset.stones);
                        let toThis = parseInt(document.getElementById("cup-7").dataset.stones);
                        document.getElementById("cup-4").dataset.stones = 0;
                        document.getElementById("cup-10").dataset.stones = 0;
                        document.getElementById("cup-4").dataset.innerHTML = 0;
                        document.getElementById("cup-10").dataset.innerHTML = 0;
                        document.getElementById("cup-7").dataset.stones = addThese + toThis;
                        document.getElementById("cup-7").innerHTML = addThese + toThis;
                    } else {
                        switchTurns();
                    }
                }
            case "cup-5":
                if (deacc === 0){
                    break;
                }
                if (theSwitch !== "cup-5") {
                    currentCup = document.getElementById("cup-5");
                    currentCup.dataset.stones = 1 + parseInt(currentCup.dataset.stones);
                    currentCup.innerHTML = currentCup.dataset.stones;
                    deacc -= 1;
                    if (deacc === 0 && ((document.getElementById("cup-5").dataset.stones === 0) && document.getElementById("cup-9".dataset.stones !== 0))){
                        let addThese = parseInt(document.getElementById("cup-5").dataset.stones) + parseInt(document.getElementById("cup-9").dataset.stones);
                        let toThis = parseInt(document.getElementById("cup-7").dataset.stones);
                        document.getElementById("cup-5").dataset.stones = 0;
                        document.getElementById("cup-9").dataset.stones = 0;
                        document.getElementById("cup-5").dataset.innerHTML = 0;
                        document.getElementById("cup-9").dataset.innerHTML = 0;
                        document.getElementById("cup-7").dataset.stones = addThese + toThis;
                        document.getElementById("cup-7").innerHTML = addThese + toThis;
                    } else {
                        switchTurns();
                    }
                }
            case "cup-6":
                if (deacc === 0){
                    break;
                }
                if (theSwitch !== "cup-6") {
                    currentCup = document.getElementById("cup-6");
                    currentCup.dataset.stones = 1 + parseInt(currentCup.dataset.stones);
                    currentCup.innerHTML = currentCup.dataset.stones;
                    deacc -= 1;
                    if (deacc === 0 && ((document.getElementById("cup-6").dataset.stones === 0) && document.getElementById("cup-8".dataset.stones !== 0))){
                        let addThese = parseInt(document.getElementById("cup-6").dataset.stones) + parseInt(document.getElementById("cup-8").dataset.stones);
                        let toThis = parseInt(document.getElementById("cup-7").dataset.stones);
                        document.getElementById("cup-6").dataset.stones = 0;
                        document.getElementById("cup-8").dataset.stones = 0;
                        document.getElementById("cup-6").dataset.innerHTML = 0;
                        document.getElementById("cup-8").dataset.innerHTML = 0;
                        document.getElementById("cup-7").dataset.stones = addThese + toThis;
                        document.getElementById("cup-7").innerHTML = addThese + toThis;
                    } else {
                        switchTurns();
                    }
                }
            case "cup-7":
                if (deacc === 0){
                    break;
                }
                if (theSwitch !== "cup-7") {
                    currentCup = document.getElementById("cup-7");
                    currentCup.dataset.stones = 1 + parseInt(currentCup.dataset.stones);
                    currentCup.innerHTML = currentCup.dataset.stones;
                    deacc -= 1;
                }
            case "cup-8":
                if (deacc === 0){
                    break;
                }
                if (theSwitch !== "cup-8") {
                    currentCup = document.getElementById("cup-8");
                    currentCup.dataset.stones = 1 + parseInt(currentCup.dataset.stones);
                    currentCup.innerHTML = currentCup.dataset.stones;
                    deacc -= 1;
                    if (deacc === 0 && ((document.getElementById("cup-8").dataset.stones === 0) && document.getElementById("cup-6".dataset.stones !== 0))){
                        let addThese = parseInt(document.getElementById("cup-8").dataset.stones) + parseInt(document.getElementById("cup-6").dataset.stones);
                        let toThis = parseInt(document.getElementById("cup-0").dataset.stones);
                        document.getElementById("cup-8").dataset.stones = 0;
                        document.getElementById("cup-6").dataset.stones = 0;
                        document.getElementById("cup-8").dataset.innerHTML = 0;
                        document.getElementById("cup-6").dataset.innerHTML = 0;
                        document.getElementById("cup-0").dataset.stones = addThese + toThis;
                        document.getElementById("cup-0").innerHTML = addThese + toThis;
                    } else {
                        switchTurns();
                    }
                }
            case "cup-9":
                if (deacc === 0){
                    break;
                }
                if (theSwitch !== "cup-9") {
                    currentCup = document.getElementById("cup-9");
                    currentCup.dataset.stones = 1 + parseInt(currentCup.dataset.stones);
                    currentCup.innerHTML = currentCup.dataset.stones;
                    deacc -= 1;
                    if (deacc === 0 && ((document.getElementById("cup-9").dataset.stones === 0) && document.getElementById("cup-5".dataset.stones !== 0))){
                        let addThese = parseInt(document.getElementById("cup-9").dataset.stones) + parseInt(document.getElementById("cup-5").dataset.stones);
                        let toThis = parseInt(document.getElementById("cup-0").dataset.stones);
                        document.getElementById("cup-9").dataset.stones = 0;
                        document.getElementById("cup-5").dataset.stones = 0;
                        document.getElementById("cup-9").dataset.innerHTML = 0;
                        document.getElementById("cup-5").dataset.innerHTML = 0;
                        document.getElementById("cup-0").dataset.stones = addThese + toThis;
                        document.getElementById("cup-0").innerHTML = addThese + toThis;
                    } else {
                        switchTurns();
                    }
                }
            case "cup-10":
                if (deacc === 0){
                    break;
                }
                if (theSwitch !== "cup-10") {
                    currentCup = document.getElementById("cup-10");
                    currentCup.dataset.stones = 1 + parseInt(currentCup.dataset.stones);
                    currentCup.innerHTML = currentCup.dataset.stones;
                    deacc -= 1;
                    if (deacc === 0 && ((document.getElementById("cup-10").dataset.stones === 0) && document.getElementById("cup-4".dataset.stones !== 0))){
                        let addThese = parseInt(document.getElementById("cup-10").dataset.stones) + parseInt(document.getElementById("cup-4").dataset.stones);
                        let toThis = parseInt(document.getElementById("cup-0").dataset.stones);
                        document.getElementById("cup-10").dataset.stones = 0;
                        document.getElementById("cup-4").dataset.stones = 0;
                        document.getElementById("cup-10").dataset.innerHTML = 0;
                        document.getElementById("cup-4").dataset.innerHTML = 0;
                        document.getElementById("cup-0").dataset.stones = addThese + toThis;
                        document.getElementById("cup-0").innerHTML = addThese + toThis;
                    } else {
                        switchTurns();
                    }
                }
            case "cup-11":
                if (deacc === 0){
                    break;
                }
                if (theSwitch !== "cup-11") {
                    currentCup = document.getElementById("cup-11");
                    currentCup.dataset.stones = 1 + parseInt(currentCup.dataset.stones);
                    currentCup.innerHTML = currentCup.dataset.stones;
                    deacc -= 1;
                    if (deacc === 0 && ((document.getElementById("cup-11").dataset.stones === 0) && document.getElementById("cup-3".dataset.stones !== 0))){
                        let addThese = parseInt(document.getElementById("cup-11").dataset.stones) + parseInt(document.getElementById("cup-3").dataset.stones);
                        let toThis = parseInt(document.getElementById("cup-0").dataset.stones);
                        document.getElementById("cup-11").dataset.stones = 0;
                        document.getElementById("cup-3").dataset.stones = 0;
                        document.getElementById("cup-11").dataset.innerHTML = 0;
                        document.getElementById("cup-3").dataset.innerHTML = 0;
                        document.getElementById("cup-0").dataset.stones = addThese + toThis;
                        document.getElementById("cup-0").innerHTML = addThese + toThis;
                    } else {
                        switchTurns();
                    }
                }
            case "cup-12":
                if (deacc === 0){
                    break;
                }
                if (theSwitch !== "cup-12") {
                    currentCup = document.getElementById("cup-12");
                    currentCup.dataset.stones = 1 + parseInt(currentCup.dataset.stones);
                    currentCup.innerHTML = currentCup.dataset.stones;
                    deacc -= 1;
                    if (deacc === 0 && ((document.getElementById("cup-12").dataset.stones === 0) && document.getElementById("cup-2".dataset.stones !== 0))){
                        let addThese = parseInt(document.getElementById("cup-12").dataset.stones) + parseInt(document.getElementById("cup-2").dataset.stones);
                        let toThis = parseInt(document.getElementById("cup-0").dataset.stones);
                        document.getElementById("cup-12").dataset.stones = 0;
                        document.getElementById("cup-2").dataset.stones = 0;
                        document.getElementById("cup-12").dataset.innerHTML = 0;
                        document.getElementById("cup-2").dataset.innerHTML = 0;
                        document.getElementById("cup-0").dataset.stones = addThese + toThis;
                        document.getElementById("cup-0").innerHTML = addThese + toThis;
                    } else {
                        switchTurns();
                    }
                }
            case "cup-13":
                if (deacc === 0){
                    break;
                }
                if (theSwitch !== "cup-13") {
                    currentCup = document.getElementById("cup-13");
                    currentCup.dataset.stones = 1 + parseInt(currentCup.dataset.stones);
                    currentCup.innerHTML = currentCup.dataset.stones;
                    deacc -= 1;
                    if (deacc === 0 && ((document.getElementById("cup-13").dataset.stones === 0) && document.getElementById("cup-1".dataset.stones !== 0))){
                        let addThese = parseInt(document.getElementById("cup-13").dataset.stones) + parseInt(document.getElementById("cup-1").dataset.stones);
                        let toThis = parseInt(document.getElementById("cup-0").dataset.stones);
                        document.getElementById("cup-13").dataset.stones = 0;
                        document.getElementById("cup-1").dataset.stones = 0;
                        document.getElementById("cup-13").dataset.innerHTML = 0;
                        document.getElementById("cup-1").dataset.innerHTML = 0;
                        document.getElementById("cup-0").dataset.stones = addThese + toThis;
                        document.getElementById("cup-0").innerHTML = addThese + toThis;
                    } else {
                        switchTurns();
                    }
                }
                if (deacc > 0){
                    theCheck += 1;
                    addToCups("cup-0", deacc);
                }
        }
    }
    console.log(stonesToDrop);
}

function switchTurns(){
    if (document.getElementById("cup-1").disabled === true){
        document.getElementById("cup-1").disabled = false;
        document.getElementById("cup-2").disabled = false;
        document.getElementById("cup-3").disabled = false;
        document.getElementById("cup-4").disabled = false;
        document.getElementById("cup-5").disabled = false;
        document.getElementById("cup-6").disabled = false;
        
        document.getElementById("cup-8").disabled = true;
        document.getElementById("cup-9").disabled = true;
        document.getElementById("cup-10").disabled = true;
        document.getElementById("cup-11").disabled = true;
        document.getElementById("cup-12").disabled = true;
        document.getElementById("cup-13").disabled = true;
    } else {
        document.getElementById("cup-1").disabled = true;
        document.getElementById("cup-2").disabled = true;
        document.getElementById("cup-3").disabled = true;
        document.getElementById("cup-4").disabled = true;
        document.getElementById("cup-5").disabled = true;
        document.getElementById("cup-6").disabled = true;
        
        document.getElementById("cup-8").disabled = false;
        document.getElementById("cup-9").disabled = false;
        document.getElementById("cup-10").disabled = false;
        document.getElementById("cup-11").disabled = false;
        document.getElementById("cup-12").disabled = false;
        document.getElementById("cup-13").disabled = false;
        
    }
}

document.getElementById("cup-1").addEventListener("click", moveStones);
document.getElementById("cup-2").addEventListener("click", moveStones);
document.getElementById("cup-3").addEventListener("click", moveStones);
document.getElementById("cup-4").addEventListener("click", moveStones);
document.getElementById("cup-5").addEventListener("click", moveStones);
document.getElementById("cup-6").addEventListener("click", moveStones);

document.getElementById("cup-8").addEventListener("click", moveStones);
document.getElementById("cup-9").addEventListener("click", moveStones);
document.getElementById("cup-10").addEventListener("click", moveStones);
document.getElementById("cup-11").addEventListener("click", moveStones);
document.getElementById("cup-12").addEventListener("click", moveStones);
document.getElementById("cup-13").addEventListener("click", moveStones);


let playerOneBoard = [
    document.getElementById("cup-1"),
    document.getElementById("cup-2"),
    document.getElementById("cup-3"),
    document.getElementById("cup-4"),
    document.getElementById("cup-5"),
    document.getElementById("cup-6"),
];

let playerTwoBoard = [
    document.getElementById("cup-8"),
    document.getElementById("cup-9"),
    document.getElementById("cup-10"),
    document.getElementById("cup-11"),
    document.getElementById("cup-12"),
    document.getElementById("cup-13")
];



