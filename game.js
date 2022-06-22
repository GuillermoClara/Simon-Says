var colors = ['green','yellow','red','blue'];
var pattern = [];
var currentIndex = 0;
var inGame = false;
var level = 1;
var waiting = false;
var delay = determineDelayTime();


//Handle to start game
$(document).on("keypress touchstart", function(){

  if(inGame == false){
    $("h1").text("Level "+level);
    inGame =true;
    pattern = [];
    currentIndex = 0;
    level = 1;
    pickRandomButton();
  }



});

//Checks if the button clicked is the same as the one in the parrent
// with its corresponding index
$(".btn").click(function(event){
  if(inGame == true && waiting == false){

    let color = this.classList[0];
    console.log(color);
    console.log(pattern);
    if(pattern[currentIndex]==color){

       //If already checked all colors succesfully, level up
       if(currentIndex == pattern.length-1){
         levelUp();
       } else {
         //If not, increase index to check next color
         currentIndex++;
       }

       playSound(color);

    } else {
      //If colors are not the same, game over
      gameOver();
      playSound(color);
      playSound("wrong");
    }
    animatePress(color);





  }
});

//Resets values
function gameOver(){
  currentIndex = 0;
  level = 1;
  inGame = false;
  waiting = false;
  let bgColor = $("body").css("background-color");
  $("body").css("background-color", "red");
  $("h1").text("Game over. Press any key to start again");
  setTimeout(function(){
      $("body").css("background-color", bgColor);
  }, 100);

}

//Reset index since we will we checking again
function levelUp(){
  level++;
  currentIndex = 0;
  $("h1").text("Level "+level);
  waiting = true;
  setTimeout(function(){
      pickRandomButton();
      waiting = false;
  }, delay);

}

function pickRandomButton(){
  let randomIndex = Math.floor( Math.random()*4);
  console.log(randomIndex);
  let color = colors[randomIndex];
  pattern.push(color);
  playSound(color);
  animatePress(color);

}

function animatePress(color){
  $("."+color).addClass("pressed");
  setTimeout(function(){
    $("."+color).removeClass("pressed");
  }, 100);
}


function playSound(color){
  let audio = "wrong";
  switch(color){
    case "blue":
    case "red":
    case "yellow":
    case "green":
      audio = color;
  }

  let audioPlayer = new Audio("sounds/"+audio+".mp3");
  audioPlayer.play();
}

function determineDelayTime(){
  let difficulty = window.localStorage.getItem("difficulty");
  if(difficulty == null){
    return 1000;
  }

  if(difficulty == "Easy")
    return 1000;
  else if(difficulty == "Medium")
    return 850;
  else
    return 460;
}
