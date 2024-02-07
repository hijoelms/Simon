var block=[ "green","red", "yellow", "blue"];
var listIndx = -1;
var turn= "user";
var userTurn="user";
var compueterTurn="computer";
var gameOn = true;

var noOfBlock= block.length;
var gameOrderList =[];
console.log(noOfBlock);


$(".btn-start").show();

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  };
  
function makeSound (key) {
    switch (key) {
        case "red":
            var audioR = new Audio('./sounds/red.mp3');
            audioR.play();
            break;
        case "green":
            var audioG = new Audio('./sounds/green.mp3');
            audioG.play();
            break;
        case "blue":
            var audioB = new Audio('./sounds/blue.mp3');
            audioB.play();
            break;
        case "yellow":
            var audioY = new Audio('./sounds/yellow.mp3');
            audioY.play();
            break;
        case "wrong":
            var audioY = new Audio('./sounds/wrong.mp3');
            audioY.play();
            break;
        default:
            break; console.log(key);
    }

}

function setLevelTitle(inputText){
    $("#level-title").text(inputText);
}

function playComputer(){
    setTimeout(function(){
        pickRandomBlock();
    }, 500);
}

function pickRandomBlock(){
    var randomPick =getRandomInt(noOfBlock);
        // console.log(randomPick);
    gameOrderList.push(randomPick);
    setLevelTitle( "Level " + gameOrderList .length);

    makeSound(block[randomPick]);
    $("." + block[randomPick] ).addClass("pressed");
    console.log($("." + block[randomPick] ).attr("class"));

    //this remove pressed class after 100 milli seconds
    setTimeout(function(){
        // console.log(block[randomPick]);
        // console.log("this will remove the pressed class:" + "." + block[randomPick]);
        $("." + block[randomPick]).removeClass('pressed');
        // console.log( $("." + block[randomPick] ).attr("class"));
    }, 100);

    turn = userTurn; 
    gameOn = true;
    listIndx = -1;
    console.log(gameOrderList);
}

$(document).keydown(function(event){
    console.log(event.key + " " + event.keyCode + " " + turn + " " + gameOn);
    if (turn===userTurn && gameOn) {
        if ($("body").hasClass("game-over")) {
                $("body").removeClass("game-over");
                //reset the list
                gameOrderList =[];
                listIndx = -1;
            }
        var key = event.keyCode;
        // Only allow numbers to be entered
        if (key < 91 && key > 48) {
            playComputer(); 
        }
          
    }   
});

$(".btn-start").click( function(){
    if (turn===userTurn && gameOn ) {
        if ($("body").hasClass("game-over")) {
                $("body").removeClass("game-over");
                //reset the list
                gameOrderList =[];
                listIndx = -1;
            }
        $(".btn-start").hide();
        turn = compueterTurn; 
        playComputer(); 
        
          
    }  
}
);

function getBtnColor(indx){
    return block[gameOrderList[indx]];
}

function setGameover(){
    
    makeSound("wrong");
    $("body").addClass("game-over");

    setLevelTitle( "Game Over, Press Any Key to Restart");
    $(".btn-start").show();
    setTimeout(function(){

        $("body").removeClass('game-over');
    
    }, 500);
    gameOrderList =[];
    gameOn = true;
    
}

$(".btn").click( function(){
    console.log("inside click " +  turn + " " + gameOn);
    if (turn === userTurn && gameOn) {

        var userClickedButton = $(this).attr("id");
        listIndx++;

        console.log( "inside click " + userClickedButton + " " + getBtnColor(listIndx));
        if ( getBtnColor(listIndx)===userClickedButton){
            makeSound(userClickedButton);
            if ( listIndx === gameOrderList.length - 1) {
                turn= compueterTurn; 
                playComputer();  
            } else {
                turn = userTurn ;
            }
             
        } else {
            turn = userTurn ;
            setGameover();
        }
    }

}

);




