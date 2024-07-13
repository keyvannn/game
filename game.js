var started = false;
var level = 0;
var userClickedPattern=[];
var gamePattern =[];
var buttenColours = ["red","blue","green","yellow"];

function nextSequence(){
    var randomNumber = Math.floor((Math.random()*4));
    var randomChosenColour = buttenColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("level "+level);
}


$("body").keydown(function(){
    if(started==false){
        nextSequence();
        started=true;
    }
})




$(".btn").click(function () { 
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    $("#"+userChosenColour).fadeOut(100).fadeIn(100);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
});

function playSound(name){
    var soundAdress = "./sounds/"+name+".mp3";
    var audio = new Audio(soundAdress);
    audio.play();
}

function animatePress(currentClour){ 
    $("."+currentClour).addClass("pressed");
    setTimeout(function() {
        $("."+currentClour).removeClass("pressed");
    }, 100);  
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(currentLevel===gamePattern.length-1){
            setTimeout(function() {
                nextSequence();
            }, 1200); 
            userClickedPattern=[];
        }
    }else{
        playSound("wrong");
        startOver();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200); 
        $("h1").text("Game Over, Press Any Key to Restart");
        started=false;
        $("body").keydown(function(){
            if(started==false){
                nextSequence();
                started=true;
            }
        })
        
    }
}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
    userClickedPattern=[];

}


