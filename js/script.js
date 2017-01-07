$(document).ready(function(){
  buildCards();
  cardClickHandler();
  pauseMusicHandler();
  musicToggleHandler();
  gamesPlayed();
  gameResetHandler();
  moduleHandler();
  closeHandler();
  startGameHandler();
  incrementAttempt();
  guessAccuracy();
  agentMatched();
});

var firstCard = null;
var firstCardVal = null;
var secondCard = null;
var secondCardVal = null;
var totalGamesPlayed = null;
var totalAttempts = null;
var matches = null;

/**********************
 * Music for Game Play
 **********************/
ion.sound({
  sounds: [
    {
      name: "archer-killer-theme-song"
    }
  ],
  volume: 0.5,
  path: "sounds/",
  preload: true,
  loop:true
});


// Simple
ion.sound.play("archer-killer-theme-song");

function pauseMusicHandler(){
  $('#music').on('click',pauseGameMusic);
}

function pauseGameMusic(){
  ion.sound.pause("archer-killer-theme-song");
}


/**********************
 * Music Volume
 **********************/
function musicToggleHandler(){
  $('#music').on('click',musicToogle);
}

function musicToogle(){
  $('.music_on').fadeToggle(700);
}

/**********************
* Sets Game Board
**********************/

//dynamically builds a deck of cards 1-18 and randomizes card values
function buildCards() {
  
  var cardNumbers = [0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8];
  
  var newCardOrder = shuffle(cardNumbers);
  
  for (var i=0; i<=newCardOrder.length-1; i++) {
    var cardContainer = $('<div>', {class: 'card'});
    var cardFront = $('<div>',{class: 'front'});
    var cardImg = $('<img>').attr('src', '../img/card'+newCardOrder[i]+'.jpg');
    var cardBack = $('<div>',{class: 'back'});
    $("#gameBoard").append(cardContainer);
    $(cardContainer).append(cardFront);
    $(cardFront).append(cardImg);
    $(cardContainer).append(cardBack);
  }
}

//shuffles cards
function shuffle(arr) {
  var i, j, temp;
  for (i=arr.length-1; i>0; i--){
    j = Math.floor(Math.random() * (i+1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

/**********************
 * Logic for showing cards
 **********************/
//Click handler to hide card back and reveal card face
function cardClickHandler(){
  $('.back').click(showCard);
}

//hides card back and unbinds click from '.card'
function showCard () {
  var thisCard = this;
  $(thisCard).hide();
  $(thisCard).unbind("click",showCard);
  console.log("back card is hidden to reveal face card");
  markCard(thisCard);
}

//Identifies card flipped and holds value
function markCard(card) {
  if (firstCard === null) {
    firstCard = $(card);
    firstCardVal = $(card).prev('.front').text();
    console.log("1st Card Val " + firstCardVal);
  }else if(firstCard !== null && secondCard === null){
    secondCard = $(card);
    secondCardVal = $(card).prev('.front').text();
    console.log("2nd Card Val " + secondCardVal);
    $('.back').off('click',showCard);
    checkForMatch();
    incrementAttempt();
    guessAccuracy();
  }
}

function checkForMatch(){
  if (firstCardVal === secondCardVal){
    agentMatched();
    console.log("its a match - Point");
    resetCardGuess();
    $('.back').on('click',showCard);
  }else if (firstCardVal !== secondCardVal){
    console.log("No Match");
    reveal();
  }
}

//Cards dont match - show card back,bind click handler to card, and turn click hander for rest of card deck
function reveal(){
  setTimeout(function(){
    $(firstCard).show();
    $(secondCard).show();
    console.log("face card is now hidden again");
    console.log("face card is now hidden again");
    resetCardGuess();
    $(firstCard).bind("click",showCard);
    $(secondCard).bind("click",showCard);
    $('.back').on('click',showCard);
  },1700);
}

//reset cards identified for match
function resetCardGuess(){
  firstCard = null;
  secondCard = null;
  firstCardVal = null;
  secondCardVal = null;
}

/**********************
 * Module Show / Hide Functionality
 **********************/

function startGameHandler(){
  $('.startGame').on('click', startGame)
}

function startGame(){
  $('#gameShield').fadeOut();
  gamesPlayed();
}

/**********************
 * Games Played Logic
 **********************/
function gamesPlayed(){
  if (totalGamesPlayed === null){
    totalGamesPlayed = 0;
    $('.gamesPlayed').text(" " + totalGamesPlayed);
  }else{
    totalGamesPlayed = totalGamesPlayed + 1;
    $('.gamesPlayed').text(" " + totalGamesPlayed);
  }
}

/**********************
 * Attempt Made
 **********************/
function incrementAttempt(){
  if (totalAttempts === null){
    totalAttempts = 0;
    $('.attempt').text(" " + totalAttempts)
  }else{
    totalAttempts++;
    $('.attempt').text(" " + totalAttempts);
  }
}

/**********************
 * Match Made
 **********************/
function agentMatched(){
  if (matches === null) {
    matches = 0;
    $('.match').text(" " + matches);
  }else{
    matches = matches +1;
    $('.match').text(" " + matches);
  }
}

/**********************
 * Accuracy
 **********************/
function guessAccuracy(){
  if (totalAttempts === 0){
    $('.acc').text(" " + 0);
  }else{
    $('.acc').text(" " + (matches/totalAttempts).toFixed(2)+"%");
  }
}

/**********************
 * Reset Game Logic
 **********************/

function gameResetHandler(){
  $('.reset').on('click', gameReset);
}

function gameReset(){
  $('.back').show();
  resetCardGuess();//Resets Card Values
  totalAttempts = null;
  matches = null;
  incrementAttempt();
  agentMatched();
  guessAccuracy();
  //clears accuracy, attempts, and matches
  $('#gameShield').fadeIn();
}

/**********************
 * Module Show / Hide Functionality
 **********************/
function moduleHandler(){
  $('.howToPlay').click(openModule);
}

function openModule() {
  $('.gameModule').fadeIn();
}

function closeHandler(){
  $('.closeBtn').on('click',closeModel);
}

function closeModel(){
  $('.gameModule').fadeOut();
}

