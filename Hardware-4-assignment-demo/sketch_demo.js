var portName ="/dev/ttyACM0";

//receive from Arduino
var rx_flag = 255; 
var sensorPot = 0;
var sensorPhoto = 1;
var buttonSensor = 2;
var sensors =[200,10,0];
var previousSensors = [200,10,0];
var sensorCounter = 0;

var mappedSensor = [];
var previousMappedSensor = [];


var weight     = 10;
var colorRed   = 0;
var colorGreen = 0;
var colorBlue  = 0;

function setup() {
	createCanvas(600, 400);
	serial = new p5.SerialPort();
  	serial.list();
  	serial.open(portName);
  	serial.on('connected',serverConnected);
  	serial.on('list',gotList);
  	serial.on('data',gotData);
  	serial.on('error',gotError);
  	serial.on('open',gotOpen);
	background(240);
}

function serverConnected(){
  println("Connected Server!");
}

function gotList(thelist){
  println("List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    println(i + " " + thelist[i]);
  }
}

function gotOpen(){
  println("Serial Port is Open!");
}

function gotError(theerror){
  println(theerror);
}

function gotRawData(thedata){
  println("gotRawData"+thedata);
}

function gotData(){
  while(serial.available()){
    var temp = serial.read();
    if(temp == rx_flag){
      sensorCounter = 0;
    }else{
      previousSensors[sensorCounter] = sensors[sensorCounter];
      sensors[sensorCounter] = temp;
      sensorCounter++;
    }
  }
}

function mapSensor(){
  //mapps based on canvas size

  mappedSensor[0] = (sensors[sensorPot]/255)*600;
  mappedSensor[1] = (sensors[sensorPhoto]/225)*400;

  previousMappedSensor[0] = (previousSensors[sensorPot]/255)*600;
  previousMappedSensor[1] = (previousSensors[sensorPhoto]/255)*400;
}

function drawtoolbox() {
	strokeWeight(1);
	stroke(255);
	fill(255,   0,   0);
	rect(0,   0, 20, 20);
	fill(255, 127,   0);
	rect(0,  20, 20, 20);
	fill(255, 255,   0);
	rect(0,  40, 20, 20);
	fill(  0, 255,   0);
	rect(0,  60, 20, 20);
	fill(  0, 255, 255);
	rect(0,  80, 20, 20);
	fill(  0,   0, 255);
	rect(0, 100, 20, 20);
	fill(255,   0, 255);
	rect(0, 120, 20, 20);
	fill(127,  63,   0);
	rect(0, 140, 20, 20);
	fill(240, 240, 240);
	rect(0, 160, 20, 20);
	fill(  0,   0,   0);
	rect(0, 180, 20, 20);
}

function picktoolbox() {
	if (0 < mouseX && mouseX < 20) {
		if      (mouseY < 20) {
			colorRed   = 255;
			colorGreen =   0;
			colorBlue  =   0;
			return true;
		}
		else if (mouseY < 40) {
			colorRed   = 255;
			colorGreen = 127;
			colorBlue  =   0;
			return true;
		}
		else if (mouseY < 60) {
			colorRed   = 255;
			colorGreen = 255;
			colorBlue  =   0;
			return true;
		}
		else if (mouseY < 80) {
			colorRed   =   0;
			colorGreen = 255;
			colorBlue  =   0;
			return true;
		}
		else if (mouseY < 100) {
			colorRed   =   0;
			colorGreen = 255;
			colorBlue  = 255;
			return true;
		}
		else if (mouseY < 120) {
			colorRed   =   0;
			colorGreen =   0;
			colorBlue  = 255;
			return true;
		}
		else if (mouseY < 140) {
			colorRed   = 255;
			colorGreen =   0;
			colorBlue  = 255;
			return true;
		}
		else if (mouseY < 160) {
			colorRed   = 127;
			colorGreen =  63;
			colorBlue  =   0;
			return true;
		}
		else if (mouseY < 180) {
			colorRed   = 240;
			colorGreen = 240;
			colorBlue  = 240;
			return true;
		}
		else if (mouseY < 200) {
			colorRed   =   0;
			colorGreen =   0;
			colorBlue  =   0;
			return true;
		}
	}
	return false;
}


function draw() {

	if (sensors[2] == 1) {
		if (picktoolbox() == false) {
			strokeWeight(weight);
			stroke(colorRed, colorGreen, colorBlue);
			mapSensor();
			line(previousMappedSensor[0], previousMappedSensor[1], mappedSensor[sensorPot], mappedSensor[sensorPhoto]);
			check = false;
		}	
	}
  drawtoolbox();  
}

