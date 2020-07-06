window.onload = function(){
// Listening for click events and setting variables -
	var start = document.getElementById("tosia");
	var musicOff = document.getElementById("musicOff");
	var pause = document.getElementById("pause");
	var stop = document.getElementById("stop");
	var eject = document.getElementById("eject");
	var topMenu = document.getElementsByClassName("yogaPlanChoice")[0];
	
	document.getElementById("yogaMorning").addEventListener("click", yogaPlan);
	document.getElementById("yogaEvening").addEventListener("click", yogaPlan);
	document.getElementById("yoga15").addEventListener("click", yogaPlan);
	document.getElementById("yoga30").addEventListener("click", yogaPlan);
	document.getElementById("yoga60").addEventListener("click", yogaPlan);
	document.getElementById("planChoiceContainerDesktop").addEventListener("mouseleave", showYogaPlanChoice);
	document.getElementById("rundomAsanSubmit").addEventListener("click", startYogaPlan);
	
	start.addEventListener("click", enterData);
	musicOff.addEventListener("click", musicSilent);
	pause.addEventListener("click", pauseTimer);
	stop.addEventListener("click", sessionStop);
	eject.addEventListener("click", reload);
	topMenu.addEventListener("click", showYogaPlanChoice)
//keyboard control
	document.addEventListener("keypress", keyboardControl);
	document.addEventListener("dblclick", fScreen);
}
 
// Start exercising -
function enterData(){
	flagFullscrin = true;
	flagEnter = false;

	exerciseNumber = document.getElementById("exercises").value;
	exerciseTime = document.getElementById("seconds").value - 1;

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
// Checking yoga plan and setup variables -

function startYogaPlan(){
	yogaDay = document.getElementById("yogaMorning");
	yogaEvening = document.getElementById("yogaEvening");
	yoga15 = document.getElementById("yoga15");
	yoga30 = document.getElementById("yoga30");
	yoga60 = document.getElementById("yoga60");

	if (yogaDay.checked){
		exerciseNumber = 10;
		exerciseTime = 120;
		engin();
	}
	else if (yogaEvening.checked){
		alert("joga wieczór działa");
	}
	else if (yoga15.checked){
		alert("joga 15` działa");
	}
	else if (yoga30.checked){
		alert("joga 30` działa");
	}
	else if (yoga60.checked){
		alert("joga 60` działa");
	}
	else {
		engin();
	}
}

// Engine - measures time and rounds -
var x = 0, // Variable to count down seconds
	y = 0, // Variable to count down rounds
	asanChoiceFull = 0; //variable to check asans image number
function engin(){
	var music = document.getElementById("musicExercises");
	if (pause){
		music.pause();
		window.alert("Kliknij aby kontyuować...");
		pause = false;
		music.play();
	}

// Assignment of default values
	if (exerciseNumber == ""){exerciseNumber = 55;}
	if (exerciseTime == "-1"){exerciseTime = 69;}

	var timerMain = document.getElementById("information");
	timerMain.className = "timerMain";
	timerMain.innerHTML = "Runda: <span class='changeColor0fCounter'>" + y + "</span> | " + "Sekunda: <span class='changeColor0fCounter'>" + x + "</sapn>";
	
	var timerSide = document.getElementById("timerSide");
	timerSide.className = "timerSide";
	var exercisesTimeAdd = exerciseTime + 1;
	timerSide.innerHTML = "<span class='changeColor0fCounter'>" + exerciseNumber + "r</span>" +  " po " + "<span class='changeColor0fCounter'>" + exercisesTimeAdd + "s</span>"; 
	var music = document.getElementById("musicExercises");
	var asansPlaceAfter = document.getElementById("asansPlace");

	if (y == exerciseNumber){
		music.pause();
		music.currentTime = 0;
		sessionEnd();
		flagProgressBarClock = false
		if (asanFlag){
			asansPlaceAfter.className = "asansPlaceHidden";
		}
		timerMain.innerHTML = "Runda: <span class='changeColor0fCounter'>" + y + "</span> | " + "Sekunda: <span class='changeColor0fCounter'>" + (x - 1) + "</sapn>";

	}
	else if (x <= exerciseTime  && stop) {
		x++;
		setTimeout("engin()", 1000);
		}
	else if (stop) {
		roundsSound();
		y++;
		timerMain.innerHTML = "Runda: <span class='changeColor0fCounter'>" + y + "</span> | " + "Sekunda: <span class='changeColor0fCounter'>" + x + "</sapn>";
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
	var exerciseNumber = document.getElementById("exercises").value;

	var exerciseTime = document.getElementById("seconds").value;
	
	if (exerciseNumber == ""){exerciseNumber = 55;}
	if (exerciseTime == ""){exerciseTime = 70;}

	var	z = (exerciseNumber * exerciseTime) / 100; // Varible for progressBar 

	var progressBar = document.getElementById("progressBar");
	progressBar.style.height = r + "%"
	r++;
	t = 1000 * z;
	document.getElementById("procent").innerHTML = r + "%";
	
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
// window.alert(ki.which);
// console.log(ki.which);
var musicMute = document.getElementById("musicExercises");
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

// Show asans in order, random or in plan  -
var asanNumber = 1;
const resultRandom = [];
var asanFlag = false;
function asanChoice(){
	var asansPlace = document.getElementById("asansPlace");
	var asansShow = document.getElementById("asansShow");
	var asanRundom = Math.floor(Math.random() * 34 + 1); // how many pictures in a folder
	var yogaEvening = document.getElementById("yogaEvening");
	var rundomAsanSubmit = document.getElementById("rundomAsanSubmit");
	
	if (yogaEvening.checked){
		rundomAsanSubmit.style.visibility = "visible";
		asanFlag = true;
	}
	
	for (let i = 0; i < resultRandom.length; i++){
		if (asanRundom === resultRandom[i]) {
			return asanChoice();
		}
	}
	
	resultRandom.push(asanRundom);
	
	if (asansShow.checked || asansRundom.checked){
		asansPlace.className = "asansPlaceShow";
		asanFlag = true;
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

function yogaPlan(){
	var asansShow = document.getElementById("asansShow"),
		asansRundom = document.getElementById("asansRundom");
		
		document.getElementById("rundomAsanSubmit").style.visibility = "visible";
		asansShow.checked = true;
		asansRundom.checked = false;
}