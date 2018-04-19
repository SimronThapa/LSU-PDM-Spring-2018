
// These constants won't change. They're used to give names to the pins used:
const int analogInPin = A0;  // Analog input pin that the pot1 is attached to
const int analogInPin1 = A1; //Analog input pin that the pot2 is attached to
const int buttonPin = 2; //Digital input pin that the pushbutton is attached to


int sensorValue = 0;        // value read from the pot1
int sensorValue1 = 0;       //value read from the pot2
int buttonState = 0;        // state read from pushbutton

int outputValue = 0;        // value output to the P5 (analog out)
int outputValue1 = 0;
int buttonOutput = 0;


const int tx_flag = 255;   //Send to P5 flag

void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
  
  pinMode(analogInPin, INPUT);
  pinMode(analogInPin1, INPUT);
  pinMode(buttonPin, INPUT);
}

void loop() {
  // read the analog in value:
  sensorValue = analogRead(analogInPin);
  sensorValue1 = analogRead(analogInPin1);
  buttonState = digitalRead(buttonPin);
  
  // map it to the range of the analog out:
  outputValue = map(sensorValue, 0, 1023, 0, 254);
  outputValue1 = map(sensorValue1, 0, 1023, 0, 254);

  if(buttonState == HIGH){
    buttonOutput = 1;
  }else{
    buttonOutput = 0;
  }
  
  //Send data to P5
  Serial.write(tx_flag);
  Serial.write(outputValue);
  Serial.write(outputValue1);
  Serial.write(buttonOutput); 
}
