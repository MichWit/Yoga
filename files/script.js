window.onload = function(){

// Listening for click events and setting variables -
	document.getElementById("tosia").addEventListener("click", enterData);
	document.getElementById("musicOff").addEventListener("click", musicSilent);
	document.getElementById("pause").addEventListener("click", pauseTimer);
	document.getElementById("stop").addEventListener("click", sessionStop);
	document.getElementById("eject").addEventListener("click", reload);
	document.getElementsByClassName("yogaPlanChoiceButton")[0].addEventListener("click", showYogaPlanChoice);
	document.getElementById("asansShow").addEventListener("click", startYogaPlanClearShowButton);
	document.getElementById("asansRundom").addEventListener("click", startYogaPlanClearShowButton);

// Asans 		
	document.getElementById("yogaMorning").addEventListener("click", yogaPlanButtonShow);
	document.getElementById("yogaEvening").addEventListener("click", yogaPlanButtonShow);
	document.getElementById("yoga15").addEventListener("click", yogaPlanButtonShow);
	document.getElementById("yoga30").addEventListener("click", yogaPlanButtonShow);
	document.getElementById("yoga60").addEventListener("click", yogaPlanButtonShow);
	document.getElementById("rundomAsanClear").addEventListener("click", startYogaPlanClear);
	document.getElementById("rundomAsanSubmit").addEventListener("click", startYogaPlan);
	document.getElementById("planChoiceContainerDesktop").addEventListener("mouseleave", showYogaPlanChoice);
	document.getElementsByClassName("yogaPlanChoiceButton")[0].addEventListener("mouseover", showYogaPlanChoice);

// Mobile
	document.getElementById("mobileJoga").addEventListener("click", mobileYoga);
	document.getElementById("mobileBoks").addEventListener("click", mobileBoks);
	document.getElementById("boksControlPauseStop").addEventListener("click", mobileBoksReset);
	document.getElementById("boksControlPause").addEventListener("click", mobileBoksPause);

	document.getElementById("boksPlanCustom").addEventListener("click", mobileBoksTotalRoundsTime);
	
	document.getElementById("boksPlanSubmit").addEventListener("click", customPlanChecker);
	document.getElementById("first").addEventListener("click", function(){mobileBoksEngin("a");});
	document.getElementById("second").addEventListener("click", function(){mobileBoksEngin("b");});
	document.getElementById("third").addEventListener("click", function(){mobileBoksEngin("c");});
	document.getElementById("fourth").addEventListener("click", function(){mobileBoksEngin("d");});

// Keyboard control
	document.addEventListener("keypress", keyboardControl);
	document.addEventListener("dblclick", fScreen);
}

// Start exercising -
var exerciseNumber = 0,
	exerciseTime = 0,
	sessionTime = 0,
	now = 0;
function enterData(){
// checking if a plan form top menu has been selected
	yogaDay = document.getElementById("yogaMorning");
	yogaEvening = document.getElementById("yogaEvening");
	yoga15 = document.getElementById("yoga15");
	yoga30 = document.getElementById("yoga30");
	yoga60 = document.getElementById("yoga60");

	if (yogaDay.checked || yogaEvening.checked || yoga15.checked || yoga30.checked || yoga60.checked){
		if (confirm("Wybrano jeden z planów. Jeśli chcesz go realizować, kliknij przycisk 'Ok' a następnie przejdź do górnego menu i tam kliknij przycisk 'Start'. Jeśli jednak wolisz kontynuować bez planu, po prostu kliknij 'Anuluj'."))
		return;
	}
	else {}

	flagFullscrin = true;
	flagEnter = false;

	exerciseNumber = document.getElementById("exercises").value;
	exerciseTime = document.getElementById("seconds").value - 1;

// Assignment of default values
	if (exerciseNumber == ""){exerciseNumber = 55;}
	if (exerciseTime == "-1"){exerciseTime = 69;}

// Variable for counting down remaining session time	
	sessionTime = exerciseNumber * (exerciseTime + 1);
		
// Checking the correctness of the entered data: numbers, not string
	var exerciseNumberCheck = parseFloat(exerciseNumber);
	var exerciseTimeCheck = parseFloat(exerciseTime);

	if(isNaN(exerciseNumberCheck) || isNaN(exerciseTimeCheck)){
		alert("Wprowadzona wartość nie jest liczbą. Proszę wprowadź poprawne dane.");
		return;
	}

// Checking the status of the music mute button -
	var music = document.getElementById("musicExercises");
	
	if (musicOff.checked) {
		var check1 = document.getElementById("music1");
		var check2 = document.getElementById("music2");
		var check3 = document.getElementById("music3");
		var check4 = document.getElementById("music4");

		if (check1.checked) 
		{
			music.src = "./music/music.mp3";
		}
		else if (check2.checked){
			music.src = "./music/rain.mp3";
		}
		else if (check3.checked){
			music.src = "./music/waves.mp3";
		}
		else if (check4.checked){
			music.src = "./music/pond.mp3";
		}
		music.currentTime = 0;
		music.play();
		music.volume = 0.0;
	}
	else { 
// Checking the selected music -
		var check1 = document.getElementById("music1");
		var check2 = document.getElementById("music2");
		var check3 = document.getElementById("music3");
		var check4 = document.getElementById("music4");

		if (check1.checked) 
		{
			music.src = "./music/music.mp3";
		}
		else if (check2.checked){
			music.src = "./music/rain.mp3";
		}
		else if (check3.checked){
			music.src = "./music/waves.mp3";
		}
		else if (check4.checked){
			music.src = "./music/pond.mp3";
		}
			music.currentTime = 0;
			music.play();
	}
// Deleiting sections of information, animations and replacing control buttons - 
		document.getElementById("information").innerHTML = "";
		
// form remove
		document.getElementById("exercises").style.display = "none";
		document.getElementById("seconds").style.display = "none";
		document.getElementById("tosia").style.display = "none";
// music selection 
 		document.getElementById("music1").disabled = true;
 		document.getElementById("music2").disabled = true;
 		document.getElementById("music3").disabled = true;
 		document.getElementById("music4").disabled = true;

 		document.getElementsByTagName("label")[0].style.cursor = "default";
 		document.getElementsByTagName("label")[1].style.cursor = "default";
 		document.getElementsByTagName("label")[2].style.cursor = "default";
 		document.getElementsByTagName("label")[3].style.cursor = "default";
// button replacement
		document.getElementById("pause").style.display = "inline-block";
		document.getElementById("stop").style.display = "inline-block";
		document.getElementById("eject").style.display = "inline-block";
// display bar
		document.getElementById("progressBar").style.visibility = "visible";
// remove top menu 
		document.getElementsByClassName("yogaPlanChoice")[0].style.display = "none";
// animation remove
		//document.getElementById("animation").style.display = "none";

// run funncions - 
		fScreen();
		progressBarStatus();
		engin();
		clock();
		currentTime();
		asanChoice();
}

// Mute music with the upper right button - 
function musicSilent() {
	var musicMute = document.getElementById("musicExercises");

	if (musicOff.checked){
		musicMute.volume = 0.0;
	}
	else {
		musicMute.volume = 1;
	}
}
// Clock pause flag -
var pause = false;
function pauseTimer(){
	if (pause) {pause = false}
	else {pause = true};
}

// Page reload - 
function reload(){
	location.reload();
	startYogaPlanClear();
}

// End of round sound - 
function roundsSound(){
	var sound = document.getElementById("roundsSound");
	sound.currentTime = 0;
	sound.play();
}

// End of the session -
function sessionEnd(){
	var sonud = document.getElementById("sessionEnd");
	sonud.currentTime = 0;
	sonud.play();
}

// Stop of the session -
var stop = true;
function sessionStop(){
	var music = document.getElementById("musicExercises");
	music.pause();
	music.currentTime = 0;
	stop = false;
	flagProgressBarClock = false;
}

// Engine - measures time and rounds -
var x = 0, // Variable to count down seconds
	y = 0, // Variable to count down rounds
	asanChoiceFull = 0; //variable to check asans image number
function engin(){
	document.getElementById("musicChoice").style.display = "none";

	var music = document.getElementById("musicExercises");
	if (pause){
		music.pause();
		window.alert("Kliknij aby kontyuować...");
		pause = false;
		music.play();
	}

	var timerMain = document.getElementById("information");
	timerMain.className = "timerMain";
	timerMain.innerHTML = "<span class='rundaAndsekunda'>Runda: </span><span class='changeColor0fCounter'>" + y + "</span> | " + "<span class='rundaAndsekunda'>Sekunda: </span><span class='changeColor0fCounter'>" + x + "</sapn>";
	
	var timerSide = document.getElementById("timerSide");
	timerSide.className = "timerSide";
	var exercisesTimeAdd = exerciseTime + 1;
	timerSide.innerHTML = "<span class='changeColor0fCounter'>" + exerciseNumber + "</span><span class='changeColor0fCounterSmall'> rund | </span> <span class='changeColor0fCounter'>" + exercisesTimeAdd + "</span><span class='changeColor0fCounterSmall'> sekund</span>"; 
	var music = document.getElementById("musicExercises");
	var asansPlaceAfter = document.getElementById("asansPlace");

	if (y == exerciseNumber){
		music.pause();
		music.currentTime = 0;
		sessionEnd();
		flagProgressBarClock = false
		timerMain.innerHTML = "<span class='endInfo'>KONIEC..</span>";
		return;
/* 		because of "return" above, the code below seems to be unnecessary - for testing!
			if (asanFlag){
			document.getElementById("container").style.visibility = "visible";
			document.getElementById("menu").style.visibility = "visible";
			document.getElementById("progressBar").style.visibility = "visible";
			document.getElementById("musicMute").style.visibility = "visible";
			document.getElementById("procent").className = "procent";
			document.getElementById("clock").className = "clock";
			document.getElementById("musicMute").className = "musicMute";
			document.body.style.backgroundImage = "url('../graphics/03.jpg')";
			asansPlaceAfter.className = "asansPlaceHidden";
		}
		timerMain.innerHTML = "<span class='rundaAndsekunda'>Runda: </span><span class='changeColor0fCounter'>" + y + "</span> | " + "<span class='rundaAndsekunda'>Sekunda: </span><span class='changeColor0fCounter'>" + (x - 1) + "</sapn>"; */
	}
	else if (x <= exerciseTime  && stop) {
		x++;
		setTimeout("engin()", 1000);
		}
	else if (stop) {
		roundsSound();
		y++;
		timerMain.innerHTML = "<span class='rundaAndsekunda'>Runda: </span><span class='changeColor0fCounter'>" + y + "</span> | " + "<span class='rundaAndsekunda'>Sekunda: </span><span class='changeColor0fCounter'>" + x + "</sapn>";
		x = 1;
		setTimeout("engin()", 1000);
// Important !!!!	
		if (asanChoiceFull === 33){ // number of asans images in a folder -1 because counts down from 0
			for (let i = 0; i < resultRandom.length; i++)
				delete resultRandom[i]; // cleaning of the asans board
			}
		asanChoice();
		asanChoiceFull++;
	}
}

// ProgressBar -
var r = 0; // Varible for progressBar
var	t = 0; // Varible for counting time

flagProgressBarClock = true;
function progressBarStatus(){
	var exerciseNumber = document.getElementById("exercises").value,
		exerciseTime = document.getElementById("seconds").value;
	
	if (exerciseNumber == ""){exerciseNumber = 55;}
	if (exerciseTime == ""){exerciseTime = 70;}

	var	z = (exerciseNumber * exerciseTime) / 100; // Varible for progressBar 

	var progressBar = document.getElementById("progressBar");
	if (r >=100 ){r = 99}; // overrun block
	progressBar.style.height = r + "%"
	r++;
	
	t = 1000 * z;
	document.getElementById("procent").innerHTML = r + "%";
	
	if (r >= 30){progressBar.style.backgroundColor = "rgb(255, 87, 58)"}
	if (r >= 50){progressBar.style.backgroundColor = "rgb(251, 255, 0)"}
	if (r >= 80){progressBar.style.backgroundColor = "rgb(0, 153, 0)"}
	if (flagProgressBarClock){setTimeout("progressBarStatus()", t);}
}

// Clock -
var s = 0, //seconds
	m = 0, //minutes
	h = 0; //hours
function clock(){
	var clockPlace = document.getElementById("clock");
	
	if (flagProgressBarClock){setTimeout("clock()", 1000);}

	if (m < 10) { m = "0" + m}
	if (s < 10) { s = "0" + s }
	if (h < 10) { h = "0" + h}
clockPlace.innerHTML = h + " : "+ m + " : " + s;
	if (s < 59){
		s++;
		m++;
		m--;
		h++;
		h--;
		}
	else {
		s = 0;
		if (m < 59){
			m++;
			h++;
			h--;
			}
		else {
			m = 0;
			h++;
			}
		}
}

// Keyboard control: space, enter, f, m, s, q, p;
var flagFullscrin = false;
var flagEnter = true;
function keyboardControl(ki){

		switch(ki.which){
			case 32:
				pauseTimer();
				break;
			
			case 13:
				if (flagEnter){
					enterData();
					flagEnter = false;
					break;
				}
				else {break;}
			
			case 109:
				var tmp = musicOff.checked;

				if (tmp){
					musicOff.checked = false;
					musicSilent();
				}
				else if (!tmp){
					musicOff.checked = true;
					musicSilent();
				}
				break;
			
			case 115:
				sessionStop();
				break;
			
			case 113:
				reload();
				break;
			
			case  102:
				fScreen();
				break;
			case 112:
				pauseTimer();
				break;
		}
}

function fScreen(){
	if (flagFullscrin){
		document.documentElement.requestFullscreen();
		flagFullscrin = false;
   	}
  	else if (!flagFullscrin){
   		document.exitFullscreen();
   		flagFullscrin = true;
   	}
}

// Shows and hides the very top menu -
function showYogaPlanChoice(){
	document.getElementsByClassName("yogaPlanChoice")[0].classList.toggle("yogaPlanChoiceShow");
}

// Shows the clear button and clean the option buttons
function startYogaPlanClearShowButton(){
	document.getElementById("rundomAsanClear").style.visibility = "visible";
	document.getElementById("rundomAsanSubmit").style.visibility = "hidden";
	for (i = 0; i <= 4; i++){
		document.getElementsByName("yogaPlan")[i].checked = false;
		document.getElementById("rundomAsanSubmit").style.visibility = "hidden";
	}
}

// Restarting the top menu settings -
function startYogaPlanClear(){
	document.getElementById("rundomAsanClear").style.visibility = "hidden";
	for (i = 0; i <= 4; i++){
		document.getElementsByName("yogaPlan")[i].checked = false;
		document.getElementById("rundomAsanSubmit").style.visibility = "hidden";
	}
	for (i = 0; i <= 2; i++){
		document.getElementsByName("asans")[i].checked = false;
	}
}

// Shows the start button -
function yogaPlanButtonShow(){
	document.getElementById("rundomAsanClear").style.visibility = "visible";
	document.getElementById("rundomAsanSubmit").style.visibility = "visible";
	document.getElementById("rundomAsanSubmit").style.visibility = "visible";
	for (i = 0; i <= 2; i++){
		document.getElementsByName("asans")[i].checked = false;
	}
}

// Asans in order or in rundom order -
var asanNumber = 1;
const resultRandom = [];
var asanFlag = false;
function asanChoice(){
	var asansPlace = document.getElementById("asansPlace");
	var asansShow = document.getElementById("asansShow");
	var asanRundom = Math.floor(Math.random() * 34 + 1); // how many pictures in a folder
	
	resultRandom.push(asanRundom);
	
	if (asansShow.checked || asansRundom.checked){
		asansPlace.className = "asansPlaceShow";
		asanFlag = true;
		
		document.getElementById("container").style.visibility = "hidden";
		document.getElementById("menu").style.visibility = "hidden";
		document.getElementById("progressBar").style.visibility = "hidden";
		document.getElementById("musicMute").style.visibility = "visible";
		document.getElementById("procent").className = "procentAsans";
		document.getElementById("clock").className = "clockAsans";
		document.getElementById("musicMute").className = "musicMuteAsans";
		document.body.style.backgroundImage = "url('../graphics/backgroundAsans.jpg')";
		
		if (asansRundom.checked) {
			asansPlace.innerHTML = "<img src='./graphics/asans/" + asanRundom + ".svg' width='400px')>";
		}
		else {
// Important!!!
			if (asanNumber <= 34){ // // number of asans images in a folder
				asansPlace.innerHTML = "<img src='./graphics/asans/" + asanNumber + ".svg' width='400px')>";
				asanNumber++;
			}
			else {
				asanNumber = 1;
				asansPlace.innerHTML = "<img src='./graphics/asans/" + asanNumber + ".svg' width='400px')>";
				asanNumber++;
			}
		}
	}
}

// Shows asanas according to the selected plan -

function startYogaPlan(){
	yogaDay = document.getElementById("yogaMorning");
	yogaEvening = document.getElementById("yogaEvening");
	yoga15 = document.getElementById("yoga15");
	yoga30 = document.getElementById("yoga30");
	yoga60 = document.getElementById("yoga60");

	if (yogaDay.checked){
		alert("Joga poranna w trakcie prac :)");
	}
	else if (yogaEvening.checked){
		alert("Joga wieczorna w trakcie prac :)");
	}
	else if (yoga15.checked){
		alert("Joga 15` w trakcie prac :)");
	}
	else if (yoga30.checked){
		alert("Joga 30` w trakcie prac :)");
	}
	else if (yoga60.checked){
		alert("Joga 60` w trakcie prac :)");
	}
} 

// Mobile - Mobile - Mobile

// Yoga choiced
function mobileYoga(){
	document.getElementById("container").style.display = "block";
	document.getElementById("menu").style.display = "block";
	document.getElementById("boxAll").style.display = "none";
	document.body.style.backgroundColor = "#fff";
	document.body.style.backgroundImage = "url('./graphics/backgroundM.jpg')";
}

// Boks choiced
function mobileBoks(){
	document.getElementById("mobileBoxChoice").style.display = "none";
	document.getElementById("boksPlanContainer").style.display = "flex";
	document.getElementById("boksPlanCustom").style.display = "flex";
	document.getElementById("boksPlanSubmit").style.display = "block";
}

// checking the correctness of the entered data 
function customPlanChecker(){
	var customPlan = document.getElementById("boksPlanCustom").value;	
	if(isNaN(customPlan) || customPlan == "" || customPlan == " " || customPlan == "  "){
		alert("Pole jest puste, bądź wprowadzone dane są nieprawidłowe.");
		return;
	}
	else {
		mobileBoksEngin();
	}
}

var plan = [],
	support,
	supportCount, // for last tree seconds od each round - bell
	i = 0, // variable controlling the number of rounds
	j = 1, // variable that imitates one second
	z = 60, // variable controlling the break between rounds (in seconds)
	c = 3, // varible controlling first X seconds before starting
	mobileBoksFlag = true; // flag enabling / disabling function restart
function mobileBoksEngin(evn){
// custom plan
	var customPlan = document.getElementById("boksPlanCustom").value;
	document.getElementById("boksPlanContainer").style.display = "none";
	
	switch(evn){
		case "a": 
			plan = [1, 2, 1, 2, 1]; // selected round plan
			break;
		
		case "b": 
			plan = [1, 2, 3, 2, 1]; // selected round plan
			break;
		
		case "c": 
			plan = [1, 2, 3, 3, 2, 1]; // selected round plan
			break;
		
		case "d":
			plan = [2, 3, 3, 3, 3, 2]; // selected round plan
			break;
		
		default:
				plan = customPlan; // user compouse round plan
			break;
	}
		support = plan[i] * 60; // sets the length of rounds (in seconds)
		flagFullscrin = true;
		fScreen();
		setTimeout("mobilePlanEngin()", 1000);	
}

// function supporting the clock, breaks and end of exercise.
function mobilePlanEngin(){

// checking of pause flag
	if (mobileBoksPauseFlag == false){
		setTimeout("mobilePlanEngin()", 300);
		return;
	}

	var ringBell = document.getElementById("roundsSound");

// 	counting down to start
	if (c >= 0){
		ringBell.src = "./music/countingDown.mp3";
		if (c == 0){
			ringBell.src = "./music/startBell.mp3";
			c = "<span class='go'>Go!</span>";
		}
		document.getElementById("boksTimer").innerHTML = "<span class='boksroundsBreak'> " + c + "</span>";
		c--;
		ringBell.play();

// round highlight
		var boksRounds = document.getElementById("boksRounds").innerHTML;
		boksRounds = "";
		for (var tl = 0; tl < plan.length; tl++){
			if (tl == i){
				boksRounds = boksRounds + "<span class='boksRoundRun'>" + plan[tl] + "</span>";
			}
			else {
				boksRounds = boksRounds + plan[tl];
			}
		}
		document.getElementById("boksRounds").innerHTML = boksRounds;


		setTimeout("mobilePlanEngin()", 1000);
	}
	else {
// last tree secunds of round - ring bell 
		if (supportCount < 4 && supportCount > 0) {
			ringBell.src = "./music/countingEndRoundDown.mp3";
			ringBell.play();
		}
		supportCount = 5;
// last five secunds of break - ring bell 
		if (z < 5 && z >= 0) {
			ringBell.src = "./music/countingEndRoundDown.mp3";
			if (z == 0){
				ringBell.src = "./music/countingEndRoundDownLonger.mp3";
			}
			ringBell.play();
		}
//	round counter
		if (i <= plan.length){
			if (support >= 0){
					document.getElementById("boksTimer").innerHTML = support;
					support = support - j;
					supportCount = support;
					 if (support < 0) {
						ringBell.src = "./music/stopBell.mp3";
						ringBell.play();
						i++;
					}
				}
				else {
					if (z >= 0){
						if (i == plan.length){
							ringBell.src = "./music/endBell.mp3";
							ringBell.play();
							document.getElementById("boksTimer").innerHTML = "<span class='boksRoundsEnd'>Koniec</span>";
							var boksRounds = document.getElementById("boksRounds");
							boksRounds.className = "boksRoundsFinish"; 
							mobileBoksFlag = false; // flag disabling function restart
							mobileBoksResetFlag = false; // flag disabling reset confirm 
							return;	
						}
						document.getElementById("boksTimer").innerHTML = "<span class='boksroundsBreak'> " +  z + "</span>";
						z--;
					}
					else {
						if (i >= plan.length){
							ringBell.src = "./music/endBell.mp3";
							ringBell.play();
							document.getElementById("boksTimer").innerHTML = "<span class='boksRoundsEnd'>Koniec</span>";
							var boksRounds = document.getElementById("boksRounds");
							boksRounds.className = "boksRoundsFinish"; 
							mobileBoksFlag = false; // flag disabling function restart
							mobileBoksResetFlag = false; // flag disabling reset confirm 
							return;
						}
						support = plan[i] * 60;
						ringBell.src = "./music/startBell.mp3";
						ringBell.play();
						document.getElementById("boksTimer").innerHTML = "<span class='go'>Go!</span>";
						z = 60;
					}
				}
			}

// round highlight
	var boksRounds = document.getElementById("boksRounds").innerHTML;
	boksRounds = "";
		for (var tl = 0; tl < plan.length; tl++){
			if (tl == i){
				boksRounds = boksRounds + "<span class='boksRoundRun'>" + plan[tl] + "</span>";
			}
			else {
				boksRounds = boksRounds + plan[tl];
			}
		}
	
	document.getElementById("boksRounds").innerHTML = boksRounds;

// 	condition for running the countdown function			
		if (mobileBoksFlag){
			setTimeout("mobilePlanEngin()", 1000);
		}
	}
}

var mobileBoksResetFlag = true;
function mobileBoksReset(){
	if (mobileBoksResetFlag == true){
	var confirmation =  confirm("Jesteś pewien, że chcesz zrezygnować?");
		if (confirmation == true){
			location.reload();
		}
	}
	else {
		location.reload();
	}
}

var mobileBoksPauseFlag = true;
function mobileBoksPause(){
	mobileBoksPauseFlag = mobileBoksPauseFlag ? false : true; 
	var pauseButton = document.getElementById("boksControlPause");

	if (mobileBoksPauseFlag == false){
		pauseButton.value = "Wznów";
		pauseButton.className = "boksControlPauseStopActive";
	}
	else {
		pauseButton.value = "Pauza";
		pauseButton.className = "boksControlPauseStop";
	}
}

// Timer showing the current system time
function currentTime(){
	document.getElementById("timer").style.display = "block";
	var date = new Date();
	var hour = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	// var miliseconds = date.getMilliseconds();

	if (hour <=9) { hour = "0" + hour}
	if (minutes <=9) { minutes = "0" + minutes}
	if (seconds <=9) { seconds = "0" + seconds}

	var timer = hour + ":" + minutes + ":"+ seconds;
// How much time is left until the session is over 
	var aux = sessionTime / 60;
	sessionTime--;
	var rounded = Math.round(aux);
// if (rounded < 2){ rounded = "<2"}
	if (rounded < 1){
		rounded = "0"
		document.getElementById("timer").innerHTML = timer + " (" + rounded + "<span class='changeColor0fCounterSmall'> min</span>" + ")";

	}
	else {
		document.getElementById("timer").innerHTML = timer + " (~" + rounded + "<span class='changeColor0fCounterSmall'> min</span>" + ")";
	}

	setTimeout("currentTime()", 1000);
}

function mobileBoksTotalRoundsTime(){
	document.getElementById("leftTime").style.visibility = "visible";
	var allPlan = document.getElementById("boksPlanCustom").value,
		total = 0;

	for (var i = 0; i < allPlan.length; i++){
		total += parseFloat(allPlan[i]);
	}

	if (allPlan == ""){
		document.getElementById("leftTime").style.visibility = "hidden";
		document.getElementById("leftTime").style.color = "rgb(182, 182, 182)";

	}
	else {
		if (total <= 14){
		document.getElementById("leftTime").style.color = "rgb(182, 182, 182)";
		}
		if (total >= 15){
			document.getElementById("leftTime").style.color = "rgb(59, 160, 0)";
		}
		if (total > 20){
			document.getElementById("leftTime").style.color = "rgb(255, 0, 0)";
		}
		document.getElementById("leftTime").innerHTML = total + "`";
	}
	setTimeout("mobileBoksTotalRoundsTime()", 200);
}