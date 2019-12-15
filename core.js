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

function addTo(thisCup) {  
    console.log('this is the current cup' + thisCup);
    let currentCup = document.getElementById(thisCup);     //this is when i determined how to effectively refactor
    currentCup.dataset.stones = 1 + parseInt(currentCup.dataset.stones);
    currentCup.innerHTML = currentCup.dataset.stones;
    

}

// function checkFor(stones) {
//     // console.log('there are this many stones: ' + stones);
//     if (stones === 0){
//         switchTurns();
//         break;
//     }
// }

function captureCheck(landing, adjacent, thePlayer){
    let landingCup = parseInt(document.getElementById(landing).innerHTML);
    let adjacentCup = parseInt(document.getElementById(adjacent).innerHTML);
    let currentScore = 0;
    let capturedStones = 0;

    console.log(landingCup);
    console.log(adjacentCup);

    if (landingCup === 1){
        switch(landing){
            case "cup-1":
            case "cup-2":
            case "cup-3":
            case "cup-4":
            case "cup-5":
            case "cup-6":
                if (thePlayer === "playerOne"){
                    capturedStones = landingCup + adjacentCup;
                    currentScore = parseInt(document.getElementById("cup-7").innerHTML);
                    document.getElementById("cup-7").innerHTML = capturedStones + currentScore;
                    document.getElementById("cup-7").dataset.stones = capturedStones + currentScore;
                    
                    document.getElementById(landing).innerHTML = 0;
                    document.getElementById(adjacent).innerHTML = 0;
                    document.getElementById(landing).dataset.stones = 0;
                    document.getElementById(adjacent).dataset.stones = 0;
                }
                break;
            case "cup-8":
            case "cup-9":
            case "cup-10":
            case "cup-11":
            case "cup-12":
            case "cup-13":
                if (thePlayer === "playerTwo"){
                    capturedStones = landingCup + adjacentCup;
                    currentScore = parseInt(document.getElementById("cup-0").innerHTML);
                    document.getElementById("cup-0").innerHTML = capturedStones + currentScore;
                    document.getElementById("cup-0").dataset.stones = capturedStones + currentScore;
                    
                    document.getElementById(landing).innerHTML = 0;
                    document.getElementById(adjacent).innerHTML = 0;
                    document.getElementById(landing).dataset.stones = 0;
                    document.getElementById(adjacent).dataset.stones = 0;
                }
                break;
            default: 
                break;
                
        }
    }

    
}

// function landHome(whichHome, stones) {
//     if (stones === 0){
//         let homeLander = document.getElementById(whichHome)
//         if (homeLander === "cup-0"){
//             dontChangeTurns()
//         }
        
//     }
// }

function choosePlayer(theCupId) {
    switch (theCupId){
        case "cup-1":
        case "cup-2":
        case "cup-3":
        case "cup-4":
        case "cup-5":
        case "cup-6":
            return "playerOne";
        case "cup-8":
        case "cup-9":
        case "cup-10":
        case "cup-11":
        case "cup-12":
        case "cup-13":
            return "playerTwo";
    }
}


function addToCups(e, stonesToDrop, check) {
    let playerFinder = e.target.id;
    let player = choosePlayer(playerFinder);
    let stonesLeft = stonesToDrop;                               // this will decrease as the stones are dropped
    let theCheck = check;                                   // may not need this, will test
    let theSwitch = (theCheck === 0 ? e.target.id : "cup-0");   // this will determine where the cups begin to disperse
    
    if (stonesToDrop !== 0){                                // if we're out of stones, stop doing things

        switch (theSwitch){                                 // start here after cup 13. this is also a score cup
            case "cup-0":
                if ((theSwitch !== "cup-0" || theCheck > 0) && (player === "playerTwo")) {
                    addTo("cup-0");
                    stonesLeft -= 1;
                    if (stonesLeft === 0){
                        break;
                    }
                }
            case "cup-1":
                if (theSwitch !== "cup-1" || theCheck > 0) {
                    addTo("cup-1");
                    stonesLeft -= 1;
                    if (stonesLeft === 0){
                        captureCheck("cup-1","cup-13", player);
                        switchTurns();
                        break;
                    }
                }
            case "cup-2":
                if (theSwitch !== "cup-2" || theCheck > 0) {
                    addTo("cup-2");
                    stonesLeft -= 1;
                    if (stonesLeft === 0) {
                        captureCheck("cup-2", "cup-12", player);
                        switchTurns();
                        break;
                    }
                }
            case "cup-3":
                if (theSwitch !== "cup-3" || theCheck > 0) {
                    addTo("cup-3");
                    stonesLeft -= 1;
                    if (stonesLeft === 0) {
                        captureCheck("cup-3", "cup-11", player);
                        switchTurns();
                        break;
                    }
                }
            case "cup-4":
                if (theSwitch !== "cup-4" || theCheck > 0) {
                    addTo("cup-4");
                    stonesLeft -= 1;
                    if (stonesLeft === 0) {
                        captureCheck("cup-4", "cup-10", player);
                        switchTurns();
                        break;
                    }
                }
            case "cup-5":
                if (theSwitch !== "cup-5" || theCheck > 0) {
                    addTo("cup-5");
                    stonesLeft -= 1;
                    if (stonesLeft === 0) {
                        captureCheck("cup-5", "cup-9", player);
                        switchTurns();
                        break;
                    }
                }
            case "cup-6":
                if (theSwitch !== "cup-6" || theCheck > 0) {
                    addTo("cup-6");
                    stonesLeft -= 1;
                    if (stonesLeft === 0) {
                        captureCheck("cup-6", "cup-8", player);
                        switchTurns();
                        break;
                    }
                }
            case "cup-7":
                if (player === "playerOne") {
                    addTo("cup-7");
                    stonesLeft -= 1;
                    if (stonesLeft === 0){
                        break;
                    }
                }
            case "cup-8":
                if (theSwitch !== "cup-8" || theCheck > 0) {
                    addTo("cup-8");
                    stonesLeft -= 1;
                    if (stonesLeft === 0) {
                        captureCheck("cup-8", "cup-6", player);
                        switchTurns();
                        break;
                    }
                }
            case "cup-9":
                if (theSwitch !== "cup-9" || theCheck > 0) {
                    addTo("cup-9");
                    stonesLeft -= 1;
                    if (stonesLeft === 0) {
                        captureCheck("cup-9", "cup-5", player);
                        switchTurns();
                        break;
                    }
                }
            case "cup-10":
                if (theSwitch !== "cup-10" || theCheck > 0) {
                    addTo("cup-10");
                    stonesLeft -= 1;
                    if (stonesLeft === 0) {
                        captureCheck("cup-10", "cup-4", player);
                        switchTurns();
                        break;
                    }
                }
            case "cup-11":
                if (theSwitch !== "cup-11" || theCheck > 0) {
                    addTo("cup-11");
                    stonesLeft -= 1;
                    if (stonesLeft === 0) {
                        captureCheck("cup-11", "cup-3", player);
                        switchTurns();
                        break;
                    }
                }
            case "cup-12":
                if (theSwitch !== "cup-12" || theCheck > 0) {
                    addTo("cup-12");
                    stonesLeft -= 1;
                    if (stonesLeft === 0) {
                        captureCheck("cup-12", "cup-2", player);
                        switchTurns();
                        break;
                    }
                }
            case "cup-13":
                if (theSwitch !== "cup-13" || theCheck > 0) {
                    addTo("cup-13");
                    stonesLeft -= 1;
                    if (stonesLeft === 0){
                        captureCheck("cup-13", "cup-1", player);
                        switchTurns();
                        break;
                    }
                }
                if (stonesLeft > 0){
                    theCheck += 1;
                    addToCups(e, stonesLeft, theCheck);
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



