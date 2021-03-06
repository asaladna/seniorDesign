#include <SoftwareSerial.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

#define SERVOMIN  150
#define SERVOMAX  600

int movement[16];
int msg[16];
uint8_t servonum = 0;
int ledPin = 8;
void setup() {
  Serial.begin(9600);
      while (!Serial) {
    ; 
    // wait for serial port to connect. Needed for native USB port only
    pinMode(ledPin, OUTPUT);
    
  }
  

  
  pwm.begin();
  
  pwm.setPWMFreq(60);  // Analog servos run at ~60 Hz updates

 
  yield();
}


void loop() {
  digitalWrite(ledPin, HIGH);
   int counter = 0;

  for(int x = 0; x < 16; x++)
  {
    msg[x] = 0;
  }
   
   while (Serial.available()>0)
  { 
    //reads from Python program to array
    msg[counter]=Serial.read();

    //accounts for the flipped servos  
    if(counter <= 3)
    {
      msg[counter] = ((msg[counter] - 9) * -1);
    }
    else if(counter >= 8 && counter <= 11)
    {
      msg[counter] = ((msg[counter] - 9) * -1);
    }
    movement[counter] = (msg[counter]*50 + 150);

    
    counter++;

  //actual pin commands odering them to move

  //row 1
  pwm.setPWM(0, 0, movement[0]);
  pwm.setPWM(1, 0, movement[1]);
  pwm.setPWM(2, 0, movement[2]);
  pwm.setPWM(3, 0, movement[3]);


  //row 2
  pwm.setPWM(4, 0, movement[4]);
  pwm.setPWM(5, 0, movement[5]);
  pwm.setPWM(6, 0, movement[6]);
  pwm.setPWM(7, 0, movement[7]);


  //row 3
  pwm.setPWM(8, 0, movement[8]); 
  pwm.setPWM(9, 0, movement[9]);
  pwm.setPWM(10, 0, movement[10]);
  pwm.setPWM(11, 0, movement[11]);


  //row 4
  pwm.setPWM(12, 0, movement[12]);
  pwm.setPWM(13, 0, movement[13]);
  pwm.setPWM(14, 0, movement[14]);
  pwm.setPWM(15, 0, movement[15]);
  

  
  }
 
}
