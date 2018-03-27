// Available Cards for level A = Beginner and level B = Advanced

 const imageBeginnerList = [
	{	card: 1,
		img: "imgBeginner/baratheon.svg"
	},
	{	card: 2,
		img: "imgBeginner/greyjoy.svg"
	},
	{	card: 3,
		img: "imgBeginner/lannister.svg"
	},
	{	card:4,
	img: "imgBeginner/martell.svg"
	},
	{	card: 5,
		img: "imgBeginner/mormont.svg"
	},
	{	card: 6,
		img: "imgBeginner/stark.svg"
	},
	{	card: 7,

		img: "imgBeginner/targaryen.svg"
	},
	{	card: 8,
		img: "imgBeginner/tyrell.svg"
	},
	{	card: 9,
		img: "imgBeginner/baratheon.svg"
	},
	{	card: 10,
		img: "imgBeginner/greyjoy.svg"
	},
	{	card: 11,
		img: "imgBeginner/lannister.svg"
	},
	{	card: 12,
		img: "imgBeginner/martell.svg"
	},
	{	card: 13,
		img: "imgBeginner/mormont.svg"
	},
	{	card: 14,
		img: "imgBeginner/stark.svg"
	},
	{	card: 15,
		img: "imgBeginner/targaryen.svg"
	},
	{	card: 16,
		img: "imgBeginner/tyrell.svg"
	}
];

const imageAdvancedList = [
	{	card: 1,
		img: "imgAdvanced/arya.jpg"
	},
	{	card: 2,
		img: "imgAdvanced/brienne.jpg"
	},
	{	card: 3,
		img: "imgAdvanced/cersei.jpg"
	},
	{	card:4,
		img: "imgAdvanced/daenerys.jpg"
	},
	{	card: 5,
		img: "imgAdvanced/jamie.jpg"
	},
	{	card: 6,
		img: "imgAdvanced/john.jpg"
	},
	{	card: 7,
		img: "imgAdvanced/tormund.jpg"
	},
	{	card: 8,
		img: "imgAdvanced/tyrion.jpg"
	},
	{	card: 9,
		img: "imgAdvanced/arya.jpg"
	},
	{	card: 10,
		img: "imgAdvanced/brienne.jpg"
	},
	{	card: 11,
		img: "imgAdvanced/cersei.jpg"
	},
	{	card: 12,
		img: "imgAdvanced/daenerys.jpg"
	},
	{	card: 13,
		img: "imgAdvanced/jamie.jpg"
	},
	{	card: 14,
		img: "imgAdvanced/john.jpg"
	},
	{	card: 15,
		img: "imgAdvanced/tormund.jpg"
	},
	{	card: 16,
		img: "imgAdvanced/tyrion.jpg"
	}
];

const cardTop =  document.querySelectorAll('.card_top');
const imagesTop = document.querySelectorAll('.image_top'); 
let gameTimeInterval;


// Basic Functions
function startGame() {
	addImagestoHTML();
	startGameTime();
	initializeRestartButton();
}

function restartGame() {
	resetScore();
	addImagestoHTML();
	resetGameTime();
	initializeRestartButton();
	
}

function restartGameAdvanced() {
	resetScore();
	addImagestoHTMLAdvanced();
	resetGameTime();
	initializeAdvancedButton();
}


/*
*	@description - Images: shuffle and put or remove from the HTML page
*	
*/

// not a true randomizing function but seems to be OK for a Matching Game 
function randomize(a, b) {
    return Math.random() - 0.5;
}


// Adding the images to the HTML page and initialize eventListeners for the game	
function addImagestoHTML() {
	removeAllImages();
	removeAllImagesAdvanced()
	imageBeginnerList.sort(randomize);
	for (let i = 0; i < imageBeginnerList.length; i++ ) {
		imagesTop[i].setAttribute('src', imageBeginnerList[i].img );
	}
	initializeEventListeners();		
}	

// Remove the images from the HTML page
function removeAllImages() {
	for (let i = 0; i < imageBeginnerList.length; i++ ) {
		imagesTop[i].setAttribute('src', '');
		imagesTop[i].className = 'image_top';
	}
}

// Advanced Version - Adding the Cards to the HTML page
function addImagestoHTMLAdvanced() {
	removeAllImages();
	removeAllImagesAdvanced()
	imageAdvancedList.sort(randomize);
	for (let i = 0; i < imageAdvancedList.length; i++ ) {
		imagesTop[i].setAttribute('src', imageAdvancedList[i].img );
	}
	initializeEventListeners();		
}

// Advanced Version - Remove the images from the HTML page
function removeAllImagesAdvanced() {
	for (let i = 0; i < imageAdvancedList.length; i++ ) {
		imagesTop[i].setAttribute('src', '');
		imagesTop[i].className = 'image_top';
	}
}


/*
*	@description - Setting timer functions using Date.now()
*	@description -  Converting the milliseconds into an interval printing seconds and minutes
*	
*/

function startGameTime() {
	const gameTime = document.querySelector('.paragraph_timer');
	const timeStamp = Date.now();

	clearInterval(gameTimeInterval);
	gameTimeInterval = setInterval(function () {
		let deltaTime = Math.floor((Date.now() - timeStamp) / 1000);
		let seconds = deltaTime % 60 < 10 ? "0" + deltaTime % 60 : deltaTime % 60;
		let minutes = Math.floor(deltaTime / 60) < 10 ? "0" + Math.floor(deltaTime / 60) : Math.floor(deltaTime / 60);
		gameTime.innerText = minutes + " : " + seconds;
	}, 500);
}	

function stopGameTime() {
	clearInterval(gameTimeInterval);
}

function resetGameTime() {
	clearInterval(gameTimeInterval);
	startGameTime();
}


/*
*	@description - Game Controls, Buttons
*	
*/

function initializeRestartButton() {
	const restartButton = document.querySelector('#restart');
	restartButton.addEventListener('click', restartGame);
}

function initializeAdvancedButton() {
	const advancedButton = document.querySelector('#advanced');
	advancedButton.addEventListener('click', restartGameAdvanced);
}

function playAgainButton() {
	const playAgainButton = document.querySelector('.play_again');
	playAgainButton.addEventListener('click', restartGame);
}


// Special Thanks to the #hard_coder team giving me the tip to use "bool" :-)
function matchedImages(bool) {
	const selectedImages = document.querySelectorAll('.selected');

	let tempClass = 'match';
	if (!bool) {
		tempClass = 'incorrect';
	}

	selectedImages.forEach(function (element) {
  		return element.className = tempClass;
	});

	flipIncorrectImages();
}

// 1 sec waiting, in order to give the user a chance to memorize the cards
function flipIncorrectImages() {
	const selectedIncorrect = document.querySelectorAll('.incorrect');
	setTimeout(function () {
  		return selectedIncorrect.forEach(function (element) {
    		return element.className = 'image_top';
 		});
	}, 1000);
}


/*
*	@description - Scoring
*	
*/

function resetScore() {
	removeAllImages();
	removeAllImagesAdvanced()
	const stars = document.querySelectorAll('.fa-star');
	for ( let i = 0; i < 3; i++) {
		stars[i].style.color = '#fbca39';
		}
	const winningStars = document.querySelectorAll('.winning_stars .fa-star');
	for ( let i = 0; i < 3; i++) {
		winningStars[i].style.color = '#fbca39';
		}	
	document.querySelector('.winner_message').classList.remove('active');
	document.querySelector('.paragraph_moves').innerText = 'Moves: 0';
	clickCounter = 0;
}

// nothing fancy just simple color settings
function updateScore(clickCounter) {
	const stars = document.querySelectorAll('.stars .fa-star');
	const winningStars = document.querySelectorAll('.winning_stars .fa-star');
	switch(clickCounter) {
    	case 10:
	       	stars[0].style.color = '#fbca39';
	      	stars[1].style.color = '#fbca39';
	      	stars[2].style.color = '#fff';
	      	winningStars[0].style.color = '#fbca39';
	      	winningStars[1].style.color = '#fbca39';
	      	winningStars[2].style.color = '#ffff';
    	break;
      	case 17:
        	stars[0].style.color = '#fbca39';
	      	stars[1].style.color = '#fff';
	      	stars[2].style.color = '#fff';
	      	winningStars[0].style.color = '#fbca39';
	      	winningStars[1].style.color = '#fff';
	      	winningStars[2].style.color = '#fff';
       	break;
      	case 24:
	        stars[0].style.color = '#fff';
	      	stars[1].style.color = '#fff';
	      	stars[2].style.color = '#fff';
	      	winningStars[0].style.color = '#fff';
	      	winningStars[1].style.color = '#fff';
	      	winningStars[2].style.color = '#fff';
   	}
}

// if all cards are "matched cards" the game is over
function checkGameOver() {
	const allImages = document.querySelectorAll('.card_top img').length;
	const matchImages = document.querySelectorAll('.match').length; //|| 0;
	if ( matchImages === allImages ) {
		displayWinningMessage();
	}
}

// activate the winning message
function displayWinningMessage() {
  	document.querySelector('.winner_message').classList.add('active');
	stopGameTime();
	winningMessage();
}

// show the scores on the winning message and activate the replay button
function winningMessage() {
	const finalGameTime = document.querySelector('.final_time');
	finalGameTime.innerText = "Time " + document.querySelector('.paragraph_timer').innerText; 
	playAgainButton();
}


/*
*	@description -  Setting the eventHandlers
*	
*/

function initializeEventListeners() {
	const imagesTop =  document.querySelectorAll('.image_top');
	let selectedImages = [];

	for ( let i = 0; i < imagesTop.length; i++ ) {
		imagesTop[i].addEventListener('click', function (evt) {
			if (imagesTop[i].className === 'image_top') {
				imagesTop[i].className = 'selected';
				selectedImages.push(imagesTop[i]);

				
				if (selectedImages.length === 2) {
					selectedImages[0].src === selectedImages[1].src  ? matchedImages(true) : matchedImages(false);
					selectedImages = [];
					clickCounter += 1;
					updateScore(clickCounter);
					document.querySelector('.paragraph_moves').innerText = 'Moves: ' + clickCounter;
					document.querySelector('.final_moves').innerText = 'Moves: ' + clickCounter;
				}
				checkGameOver();
			}
		});
	}
}

restartGameAdvanced();
startGame();