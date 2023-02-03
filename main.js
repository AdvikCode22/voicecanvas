x = 0;
y = 0;
screen_width = ""
screen_height= ""
to_number = ""
apple = ""
speak_data = ""

draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 

function preload(){
  apple = loadImage("apple.png")
}
 
recognition.onresult = function(event) {

  content = event.results[0][0].transcript;
  
  to_number = Number(content)

  if(Number.isInteger(to_number)){
    document.getElementById("status").innerHTML = "Started Drawing Apple"
    draw_apple = "set"
  }
  else{
    document.getElementById("status").innerHTML = "The Speech has not recognised a number"
  }

 console.log(event); 

  document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 

}

function setup() {
  screen_width = window.innerWidth 
  screen_height = window.innerHeight
  canvas = createCanvas(screen_width , screen_height)
}

function draw() {
  if(draw_apple == "set")
  {
    document.getElementById("status").innerHTML = to_number + " " + "Apples drawn";
    draw_apple = "";
    for(i = 1 ; i <= to_number ; i++){
      x = Math.floor(Math.random() * 1000)
      y = Math.floor(Math.random() * 500)
      image(apple , x , y , 50 , 50)
    }

    document.getElementById("status").innerHTML = to_number + "Apples Drawn"
    speak_data = to_number + "Apples Drawn";
    speak()
    draw_apple = ""
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = ""
}
