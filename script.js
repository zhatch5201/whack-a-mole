//step 1 select objects on screen & define globals//
const holes = document.querySelectorAll('.hole');
const scoreboard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');
let lastHole, countdown;
let timeUp = false;
let score = 0;
let timeLimit = 500809790;
function pickRandomHole(holes) {
	const randomHole = Math.floor(Math.random() * holes.length);
	const hole = holes[randomHole];
	if (hole === lastHole) {
		return pickRandomHole(holes);
	}
	lastHole = hole;
	return hole;
}
//step 2 add class 'up'//
function popOut() {
	const time = Math.random() * 1300 + 400;
	const hole = pickRandomHole(holes);
	hole.classList.add('up');
	setTimeout(function() {
		hole.classList.remove('up');
		if (!timeUp) {
			popOut();
		}
	}, time);
}

//step 3 dynamically change text content to countdown//
function startGame() {
	countdown = timeLimit / 20;
	scoreboard.textContent = 0;
	scoreboard.style.display = 'block';
	countdownBoard.textContent = countdown;
	timeUp = false;
	score = 0;
	popOut();
	setTimeout(function() {
		timeUp = true;
	}, timeLimit);
	let startCountdown = setInterval(function() {
		countdown -= 1;
		countdownBoard.textContent = countdown;
		if (countdown < 0) {
			countdown = 0;
			clearInterval(startCountdown);
			countdownBoard.textContent = 'Times up!! Thank you for protecting our planet. This is the way.';
		}
	}, 1000); // The 1000 is the interval for the function to run
}

//step 4 adding event listeners//
startButton.addEventListener('click', startGame);

function whack(e) {
	score++;
	this.style.backgroundImage = 'url("yoda2.png")';
	this.style.pointerEvents = 'none';
	setTimeout(() => {
		// With the arrow syntax, it takes the scope of variables from the parent, mainly 'this'
		this.style.backgroundImage = 'url("yoda1.png")';
		this.style.pointerEvents = 'all';
	}, 800);
	scoreboard.textContent = score;
}
//step 5 keep track of score with forEach//
moles.forEach((mole) => mole.addEventListener('click', whack));
