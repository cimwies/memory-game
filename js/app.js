// Available Cards for level A = Beginner and level B = Advanced

 const imageBeginnerList = [ //object
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
	resetScore();
	initializeRestartButton();
	startGameTime();
}

function restartGame() {
	addImagestoHTML();
	resetScore();
	resetGameTime();
}

function startGameAdvanced() {
	addImagestoHTMLAdvanced();
	initializeAdvancedButton();
	startGameTime();
}

function restartGameAdvanced() {
	addImagestoHTMLAdvanced();
	resetScore();
	resetGameTime();
}



/*
*	@description - Images: shuffle and put or remove from the HTML page
*	
*/

// not the best reshuffling but seems to be OK for a Matching Game 
function randomize(a, b) {
    return Math.random() - 0.5;
}

// Adding the images to the HTML page	
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

// ADVANCED Version - Adding the Cards to the HTML page
function addImagestoHTMLAdvanced() {
	removeAllImages();
	removeAllImagesAdvanced()
	imageAdvancedList.sort(randomize);
	for (let i = 0; i < imageAdvancedList.length; i++ ) {
		imagesTop[i].setAttribute('src', imageAdvancedList[i].img );
	}

	initializeEventListeners();		
}	

function removeAllImagesAdvanced() {
	for (let i = 0; i < imageAdvancedList.length; i++ ) {
		imagesTop[i].setAttribute('src', '');
		imagesTop[i].className = 'image_top';
	}
}



/*
*	@description - Setting the timer functions
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
*	@description - Game Controls
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


// Thank you #hard_coder team with the tip to use bool :-)
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
	const stars = document.querySelectorAll('.fa-star');
	for ( let i = 0; i < 3; i++) {
		stars[i].style.color = '#fff';
		}
	const winningStars = document.querySelectorAll('.winning_stars .fa-star');
	for ( let i = 0; i < 3; i++) {
		winningStars[i].style.color = '#fff';
		}	
	document.querySelector('.winner_message').classList.remove('active');	
	document.querySelector('.paragraph_moves').innerText = 'Moves: 0';
}

function updateScore(clickCounter) {
	const stars = document.querySelectorAll('.stars .fa-star');
	const winningStars = document.querySelectorAll('.winning_stars .fa-star');
	switch(clickCounter) {
    	case 2:
	       	stars[0].style.color = '#fbca39';
	      	stars[1].style.color = '#fbca39';
	      	stars[2].style.color = '#fbca39';
	      	winningStars[0].style.color = '#fbca39';
	      	winningStars[1].style.color = '#fbca39';
	      	winningStars[2].style.color = '#fbca39';
    	break;
      	case 4:
        	stars[0].style.color = '#fbca39';
	      	stars[1].style.color = '#fbca39';
	      	stars[2].style.color = '#fff';
	      	winningStars[0].style.color = '#fbca39';
	      	winningStars[1].style.color = '#fbca39';
	      	winningStars[2].style.color = '#fff';
       	break;
      	case 8:
	        stars[0].style.color = '#fbca39';
	      	stars[1].style.color = '#fff';
	      	stars[2].style.color = '#fff';
	      	winningStars[0].style.color = '#fbca39';
	      	winningStars[1].style.color = '#fff';
	      	winningStars[2].style.color = '#fff';
   	}
}

function checkGameOver() {
	const allImages = document.querySelectorAll('.card_top img').length;
	const matchImages = document.querySelectorAll('.match').length || 0;
	if ( matchImages === allImages ) {
		displayWinningMessage();
	}
}

function displayWinningMessage() {
  	document.querySelector('.winner_message').classList.add('active');
	stopGameTime();
	winningMessage();
}

function winningMessage() {
	const finalClickCount = document.querySelector('.final_moves');
	const finalGameTime = document.querySelector('.final_time');
	finalClickCount.innerText = "Total moves: " ; // TODO implement clickCounter;
	finalGameTime.innerText = "Time " + document.querySelector('.paragraph_timer'); // TODO set time correct
}



/*
*	@description -  Setting the eventHandlers
*	
*/

function initializeEventListeners() {
	const imagesTop =  document.querySelectorAll('.image_top');
	let selectedImages = [];
	let clickCounter = 0;

// I am trying to push the 2 clicked images into an array, stop further clicking and compare the 2 elements. 
// If they are are identical proceed with the matchedImages()-function on line 240 and clear the selected ImagesArray for the next round 	

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
				}
				checkGameOver();
			}
		});
	}
}

startGameAdvanced();
startGame();