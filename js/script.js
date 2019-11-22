// --------------------------------------------------------------------------------------------------
// -- Variables
// --------------------------------------------------------------------------------------------------

let flash;
let turn;
let good;
let compTurn;
let intervalId;
let win;
let topScore;
let topScoreCount;

let noise = true;
let gameRunning = false;

let order = [];
let playerOrder = [];

var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)top\s*\=\s*([^;]*).*$)|^.*$/, "$1");

// --------------------------------------------------------------------------------------------------
// -- Configuration
// --------------------------------------------------------------------------------------------------

const winValue = 5; // Value to win the game !
const debug    = false; // true = MANY console.log

// --------------------------------------------------------------------------------------------------
// -- HTML Elements
// --------------------------------------------------------------------------------------------------

// Button Element
const btnTopLeft    = document.querySelector("#btnTopLeft");
const btnTopRight   = document.querySelector("#btnTopRight");
const btnBotLeft    = document.querySelector("#btnBotLeft");
const btnBotRight   = document.querySelector("#btnBotRight");
const btnStart      = document.querySelector("#btnStart");

// Text Element
const runningText   = document.querySelector("#runningText");
const finishText    = document.querySelector("#finishText");
const failedText    = document.querySelector("#failedText");
const turnInactiv   = document.querySelector("#turnInactiv");
const turnActiv     = document.querySelector("#turnActiv");
const turnFail      = document.querySelector("#turnFail");
const turnCounter   = document.querySelector("#turn");
const topScoreText  = document.querySelector("#top");

// Video Element
const finishVideo   = document.querySelector("#containerFinishVideo");
const runningVideo  = document.querySelector("#containerRunningVideo");
const welcomeVideo  = document.querySelector("#containerWelcomeVideo");

// Modal Element
const beReadyDude   = document.querySelector("#beReadyDude");



function getCookieVal(offset) {
  var endstr=document.cookie.indexOf (";", offset);
  if (endstr==-1) endstr=document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}
function GetCookie (name) {
  var arg=name+"=";
  var alen=arg.length;
  var clen=document.cookie.length;
  var i=0;
  while (i<clen) {
    var j=i+alen;
    if (document.cookie.substring(i, j)==arg) return getCookieVal (j);
    i=document.cookie.indexOf(" ",i)+1;
    if (i==0) break;
  }
  return null;
}

topScoreText.innerHTML = GetCookie("top");
// --------------------------------------------------------------------------------------------------
// -- Functions
// --------------------------------------------------------------------------------------------------

// Debug
function debugFunc(who,text) {

    if (debug) {

        if (who == "s") {

            obj1 = "SCRIPT :";
            obj2 = text;

            console.log(obj1, obj2);

        } else if (who == "g") {

            obj1 = "GAME :";
            obj2 = text;

            console.log(obj1, obj2);
        
        } else if (who == "p") {

            obj1 = "PLAYER :";
            obj2 = text;

            console.log(obj1, obj2);
        }
    }
}

// Play
function play() {

    order = [];
    playerOrder = [];

    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
   
    good = true;
    win = false;

    for (var i = 0; i < winValue; i++) {

        order.push(Math.floor(Math.random() * 4) + 1);

    }

    compTurn = true;

    intervalId = setInterval(gameTurn, 1000);
}

// GameTurn
function gameTurn() {    

    gameRunning = false;

    if (flash == turn) {      

        clearInterval(intervalId);

        compTurn = false;

        btnClearColor();

        gameRunning = true; 

        debugFunc("g", "Computer have finish.");
    }

    if (compTurn) {

        debugFunc("g","Computer choose a button.");

        btnClearColor();

        setTimeout(() => {

            if (order[flash] == 1) btnOne();
            if (order[flash] == 2) btnTwo();
            if (order[flash] == 3) btnThree();
            if (order[flash] == 4) btnFour();

            flash++;

        }, 200);

    }

}

// BTN : TOP LEFT (Sound & Background when clicking)
function btnOne() {

    if (noise) {

        debugFunc("s", "BTN 1 - Sounding");

        let audio = document.getElementById("sound1");
        audio.play();
    }
    
    noise = true;
    btnTopLeft.style.backgroundColor = "lightgreen";
}

// BTN : TOP RIGHT (Sound & Background when clicking)
function btnTwo() {

    if (noise) {

        debugFunc("s", "BTN 2 - Sounding");

        let audio = document.getElementById("sound2");
        audio.play();
    }

    noise = true;
    btnTopRight.style.backgroundColor = "tomato";
}

// BTN : BOTTOM LEFT (Sound & Background when clicking)
function btnThree() {

    if (noise) {

        debugFunc("s", "BTN 3 - Sounding");

        let audio = document.getElementById("sound3");
        audio.play();
    }

    noise = true;
    btnBotLeft.style.backgroundColor = "yellow";
}

// BTN : BOTTOM RIGHT (Sound & Background when clicking)
function btnFour() {

    if (noise) {

        debugFunc("s", "BTN 4 - Sounding");

        let audio = document.getElementById("sound4");
        audio.play();
    }

    noise = true;
    btnBotRight.style.backgroundColor = "royalblue";
}

// COLOR ORIGIN ON BUTTON
function btnClearColor() {

    debugFunc("s", "BTN - ClearColor");

    btnTopLeft.style.backgroundColor  = "darkgreen";
    btnTopRight.style.backgroundColor = "darkred";
    btnBotLeft.style.backgroundColor  = "goldenrod";
    btnBotRight.style.backgroundColor = "darkblue";
}

// CHANGE BUTTON COLOR
function btnFlashColor() {

    debugFunc("s", "BTN - FlashColor");

    btnTopLeft.style.backgroundColor  = "lightgreen";
    btnTopRight.style.backgroundColor = "tomato";
    btnBotLeft.style.backgroundColor  = "yellow";
    btnBotRight.style.backgroundColor = "royalblue";    
}

// Check what the player is doing
function check() {

if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])

    good = false;
    
    // IF the player WIN
    if (playerOrder.length == winValue && good) {
               
        winGame(winValue);
    }

    // IF the player FAIL
    if (good == false) {

        debugFunc("g", "Player have miss");

        welcomeContainer.style.display = "none"; 
        chooseText.style.display       = "none";
        runningText.style.display      = "none";
        finishText.style.display       = "none";
        failedText.style.display       = "block";

        btnStart.style.display = "block";

        finishVideo.style.display  = "none";
        runningVideo.style.display = "none";
        welcomeVideo.style.display = "block";

        turnInactiv.style.display = "none";
        turnActiv.style.display   = "none";
        turnGG.style.display      = "none";
        turnFail.style.display    = "block";

        btnFlashColor();
                
        topScoreFunc(turn);

        noise = false;    
    }

    if (turn == playerOrder.length && good && !win) {

        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 1000);
    }

}

// When the player win the game do this
function winGame(turn) {
       
    runningText.style.display      = "none";
    welcomeContainer.style.display = "none";
    chooseText.style.display       = "none"; 
    failedText.style.display       = "none";
    finishText.style.display       = "block";

    welcomeVideo.style.display = "none";    
    runningVideo.style.display = "none";
    finishVideo.style.display  = "block";

    btnStart.style.display = "block";

    turnInactiv.style.display = "none";
    turnActiv.style.display   = "none";
    turnFail.style.display    = "none";
    turnGG.style.display      = "block";

    btnFlashColor();
    
    gameRunning = false;
    win = true;

    topScoreFunc(turn);

    debugFunc("s", "Player finish the game !");
}

function topScoreFunc(turn) {

    topScoreCount = turn;

    if (topScoreCount < topScore) {

        debugFunc("s", "Le joueur a fait un plus PETIT score");
        topScoreText.innerHTML = topScore;

    } else {

        debugFunc("s", "Le joueur a fait un plus GRAND score");

        topScoreText.innerHTML = turn;
        topScore = topScoreCount;

        document.cookie = "top ="+topScore;
        
    }

}

// --------------------------------------------------------------------------------------------------
// -- EVENTS : CLICK
// --------------------------------------------------------------------------------------------------

btnStart.addEventListener('click', (event) => {

    debugFunc("p","BTN START - Click");

    welcomeContainer.style.display = "none";
    chooseText.style.display       = "none";    
    finishText.style.display       = "none";
    failedText.style.display       = "none";
    runningText.style.display      = "block";

    welcomeVideo.style.display = "none";
    finishVideo.style.display  = "none";
    runningVideo.style.display = "block";

    turnInactiv.style.display = "none";    
    turnGG.style.display      = "none";
    turnFail.style.display    = "none";
    turnActiv.style.display   = "block";   

    btnStart.style.display = "none";



    gameRunning = true;

    if (gameRunning || win) { 

        setTimeout(() => {

            beReadyDude.style.display = "block";        
            textEffectStartGame();

        },1);

        setTimeout(() => {

            beReadyDude.style.display = "none";
                 
        },4500);
    
        setTimeout(() => {

            debugFunc("g","Is now start");  
            play();
        
        },4500);     
    }

});

// BUTTON : TOP LEFT
btnTopLeft.addEventListener('click', (event) => {

    debugFunc("p", "BTN 1 - Click")
    
    if (gameRunning) {      

        playerOrder.push(1);
        check();
        btnOne();

        if (!win) {

            setTimeout(() => {

                btnClearColor();

            }, 300);

        }
    }

});

// BUTTON : TOP RIGHT
btnTopRight.addEventListener('click', (event) => {

    debugFunc("p", "BTN 2 - Click")
    
    if (gameRunning) {

        playerOrder.push(2);
        check();
        btnTwo();
        
        if(!win) {

            setTimeout(() => {

                btnClearColor();

            }, 300);
        }
    }

});

// BUTTON : BOTTOM LEFT
btnBotLeft.addEventListener('click', (event) => {
    
    debugFunc("p", "BTN 3 - Click")
    
    if (gameRunning) {

        playerOrder.push(3);
        check();
        btnThree();
        
        if(!win) {
            
            setTimeout(() => {
                
                btnClearColor();
            
            }, 300);
        }
    }

});

// BUTTON : BOTTOM RIGHT
btnBotRight.addEventListener('click', (event) => {

    debugFunc("p", "BTN 4 - Click")

    if (gameRunning) {

        playerOrder.push(4);
        check();
        btnFour();

        if(!win) {

            setTimeout(() => {

                btnClearColor();

            }, 300);

        }
    }

});