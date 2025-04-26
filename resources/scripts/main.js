let coinSpin = 0;
let coinSpinDuration = 4;
let coinSide = false;
let heads;
let tails;
let shadow;
let randomButton;
let resultText;
let coinContainer;
let sameResultCount = 0;
let root;

const phrases = [
	"Let’s leave it up to the gods of chance!",
	"Ah yes, the ancient method of solving everything!",
	"50% science, 50% sorcery.",
	"Heads I win, tails you lose?",
	"Because rock-paper-scissors was too intense.",
	"The fate of nations has been decided with less.",
	"May the coin be ever in your favor.",
	"This is how we make billion-dollar decisions.",
	"Physics meets panic.",
	"Let's pretend this is a valid decision-making process.",
	"Time to consult the metal oracle.",
	"Because nothing says fair like airborne currency.",
	"This is how legends are born… or blamed.",
	"The suspense is flippin' real.",
	"This coin has more power than my boss.",
	"Watch closely—this is where trust dies.",
	"Democracy? Nah, let's flip a coin.",
	"And now, a decision powered by pocket change.",
	"What could go wrong with a 50/50 chance?",
	"Let chaos choose!",
	"Ah yes, the MBA method of decision-making.",
	"We've officially outsourced thinking to gravity.",
	"If it lands on its edge, we all go home.",
	"Flipping this coin because flipping a table is frowned upon.",
	"In randomness we trust. Sort of.",
	"Coin toss: because therapy is expensive.",
	"And just like that, destiny gets heads or tails.",
	"Watch this—logic's final stand.",
	"Solving life's problems one violent spin at a time.",
	"Let's ask Mr. Shiny where our lives are headed.",
];

function setCoinRotation(value) {
	root.setProperty("--coin-rotation", `${value}deg`);
}

function setCoinSpinDuration(value) {
	root.setProperty("--coin-spin-duration", `${value}s`);
}

function setNextRandomCoinSpinDuration() {
	coinSpinDuration = 2 + Math.round(4 * Math.random());
	setCoinSpinDuration(coinSpinDuration);
}

function setNextFunnyPhrase() {
	const nextPhrase =  Math.round(2 * phrases.length * Math.random()) % phrases.length;
	setResultText(phrases[nextPhrase]);
}

function setNextCoinSide() {

	const newSide = Math.random() > 0.5;

	if (coinSide === newSide) {
		sameResultCount++;
	} else {
		sameResultCount = 1;
	}

	coinSide = newSide;

}

function setNextRandomCoinRotation() {

	setNextRandomCoinSpinDuration();
	setNextCoinSide();

	coinSpin = 360 * Math.round(10 + 10 * Math.random());
	coinSpin += coinSide ? 180 : 0;

	setCoinRotation(coinSpin);

}

function setSpinningState() {
	randomButton.disabled = true;
	setResultText("...");
	setNextFunnyPhrase();
}

function setResultState() {
	randomButton.disabled = false;
	showCoinResult();
	resetCoinRotation();
}

function startCoinSpin() {

	setSpinningState();
	setNextRandomCoinRotation();

}

function setResultText(value) {
	resultText.innerHTML = value;
}

function resetCoinRotation() {
	setCoinSpinDuration(0);
	const resetRotationState = coinSpin % 360 + coinSide ? 180 : 0;
	setCoinRotation(resetRotationState);
}

function showCoinResult() {
	let resultString = coinSide ? "Tails" : "Heads";
	if (sameResultCount > 1) resultString += ` x ${sameResultCount}`;
	setResultText(resultString);
}

function coinSpinEnded() {
	setResultState();
}

window.addEventListener("load", () => {

	root = document.documentElement.style;

	heads = document.getElementById("heads");
	tails = document.getElementById("tails");
	shadow = document.getElementById("shadow");
	randomButton = document.getElementById("randomButton");
	resultText = document.getElementById("resultText");
	coinContainer = document.getElementById("coinContainer");

	randomButton.addEventListener("click", startCoinSpin);
	heads.addEventListener("transitionend", coinSpinEnded);
	coinContainer.addEventListener("click", startCoinSpin);

});
