let coinSpin = 0;
let coinSpinDuration = 4;
let lastCoinSpin = 0;
let coinSide = false;
let heads = undefined;
let randomButton = undefined;
let resultText = undefined;
let coinContainer = undefined;
let sameResultCount = 1;
let nextPhrase = 0;

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

function startCoinSpin() {
	resultText.innerHTML = "...";
	randomButton.disabled = true;
	const newSide = Math.random() > 0.5;

	nextPhrase =
		(nextPhrase + Math.round(phrases.length * Math.random())) % phrases.length;
	resultText.innerHTML = phrases[nextPhrase];

	coinSpinDuration = 2 + Math.round(5 * Math.random());
	document.body.style.setProperty(
		"--coin-spin-duration",
		`${coinSpinDuration}s`,
	);

	if (coinSide === newSide) {
		sameResultCount++;
	} else {
		sameResultCount = 1;
	}

	coinSide = newSide;

	do {
		coinSpin = 360 * Math.round(20 * Math.random());
	} while (coinSpin === lastCoinSpin);

	lastCoinSpin = coinSpin;

	console.log(coinSpin, coinSide);

	coinSpin += coinSide ? 180 : 0;
	document.body.style.setProperty("--coin-rotation", `${coinSpin}deg`);
}

function coinSpinEnded() {
	randomButton.disabled = false;
	let resultString = coinSide ? "Tails" : "Heads";

	if (sameResultCount > 1) resultString += ` x ${sameResultCount}`;

	resultText.innerHTML = resultString;
}

window.addEventListener("load", () => {
	heads = document.getElementById("heads");
	randomButton = document.getElementById("randomButton");
	resultText = document.getElementById("resultText");
	coinContainer = document.getElementById("coinContainer");

	randomButton.addEventListener("click", startCoinSpin);
	heads.addEventListener("transitionend", coinSpinEnded);
	coinContainer.addEventListener("click", startCoinSpin);
});
