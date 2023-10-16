//Score
window.onload = () => {
	if (localStorage.getItem('userScore')) {
		var userScore = localStorage.getItem('userScore');
		var computerScore = localStorage.getItem('computerScore');
	}
	else {
		var userScore = 0;
		var computerScore = 0;
	}

	document.getElementById('userScore').innerHTML = userScore
	document.getElementById('computerScore').innerHTML = computerScore
}

//Function For Next Button
const nextFun = () => {
	console.log("next button clicked")
	document.getElementById('hurrycontainer').style.display = "inherit";
	document.getElementById('rulebutton').style.display = "inherit";
	document.getElementById("next").style.display = "none";
	document.getElementById("choiceresult").style.display = "none";
	document.getElementById("choiceMaker").style.display = "none";
	document.getElementById("topbar").style.display = "none";
};

// Close the rules
const closeRules = () => {
	const gameRule = document.getElementById("gamerule");
	if (gameRule.style.display === "flex") {
		gameRule.style.display = "none";
	} else {
		gameRule.style.display = "flex";
	}
};

// Function For PlayAgain Button
const playagain = () => {
	document.getElementById("choiceMaker").style.display = "flex";
	document.getElementById("choiceresult").style.display = "none";
};

//Get the score From Local Storage
if (localStorage.getItem('userScore')) {
	var userScore = localStorage.getItem('userScore');
	var computerScore = localStorage.getItem('computerScore');
}
else {
	var userScore = 0;
	var computerScore = 0;
}

// nowPlay Function for starting the game
const nowPlay = (userChoice) => {
	localStorage.setItem('userScore', userScore)
	localStorage.setItem('computerScore', computerScore)

	const resultLoad = document.createElement("div");
	resultLoad.classList.add("winner");
	switch (userChoice) {
		case "rock":
			document.getElementById('myChoice').style.border = "20px solid #0074b6";
			document.getElementById("userChoice").src = "assets/stone.png";
			break;
		case "paper":
			document.getElementById('myChoice').style.border = "20px solid #ffa943";
			document.getElementById("userChoice").src = "assets/hand.png";
			break;
		case "scissor":
			document.getElementById('myChoice').style.border = "20px solid #bd00ff";
			document.getElementById("userChoice").src = "assets/scissor.png";
			break;
	}
	document.getElementById("choiceMaker").style.display = "none";
	document.getElementById("choiceresult").style.display = "flex";
	document.getElementById("choiceResultDetails").style.transform = "scale(0)";

	const elements = document.querySelectorAll(`.winner`);
	elements.forEach(element => {
		element.remove();
	});

	// Get the parent elements
	interval = setInterval(() => {
		clearInterval(interval);
		play(userChoice);
	}, 0);
};

const play = (userChoice) => {
	document.getElementById("choiceResultDetails").style.transform = "scale(1)";
	document.getElementById("pcChoosen").style.display = "inherit";

	// Get Random Choice From Computer
	const choices = ["rock", "paper", "scissor"];
	const randomIndex = Math.floor(Math.random() * 3);
	const computerChoice = choices[randomIndex];

	// Set User Choice
	const resultLoad = document.createElement("div");
	resultLoad.classList.add("winner");

	switch (computerChoice) {
		case "rock":
			document.getElementById('pcChoice').style.border = "20px solid #0074b6";
			document.getElementById("pcChoosen").src = "assets/stone.png";
			break;
		case "paper":
			document.getElementById('pcChoice').style.border = "20px solid #ffa943";
			document.getElementById("pcChoosen").src = "assets/hand.png";
			break;
		case "scissor":
			document.getElementById('pcChoice').style.border = "20px solid #bd00ff";
			document.getElementById("pcChoosen").src = "assets/scissor.png";
			break;
	}

	let result = "";

	if (userChoice === computerChoice) {
		result = "It's a tie!";
		document.getElementById("ResultMsg").innerHTML = "TIE UP";
		document.getElementById("resultPlayer").innerHTML = "";
	} else if (
		(userChoice === "rock" && computerChoice === "scissor") ||
		(userChoice === "paper" && computerChoice === "rock") ||
		(userChoice === "scissor" && computerChoice === "paper")
	) {
		result = "You win!";
		userScore++;
		localStorage.setItem('userScore', userScore)
		localUserScore = localStorage.getItem('userScore')

		document.getElementById("userScore").innerHTML = localUserScore;
		document.getElementById("ResultMsg").innerHTML = "You Win";
		document.getElementById("resultPlayer").innerHTML = "against pc";
		document.getElementById("myChoice").appendChild(resultLoad);
	} else {
		result = "You lose!";
		computerScore++;
		localStorage.setItem('computerScore', computerScore)
		localPCScore = localStorage.getItem('computerScore')

		document.getElementById("computerScore").innerHTML = localPCScore;
		document.getElementById("ResultMsg").innerHTML = "YOU LOST";
		document.getElementById("resultPlayer").innerHTML = "AGAINST PC";
		document.getElementById("pcChoice").appendChild(resultLoad);
	}
	document.getElementById('next').style.display = 'inherit'
	// Show Next Button After User Win
	if (result === "You win!") {
		document.getElementById('next').style.display = 'inherit'
	} else {
		document.getElementById('next').style.display = 'none'
	}
};