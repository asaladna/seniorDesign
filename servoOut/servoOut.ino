#include <SoftwareSerial.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

#define SERVOMIN  150
#define SERVOMAX  600

int test= 9;
bool flag = true;
int movement[3];
int msg[3];
uint8_t servonum = 0;

void setup() {
  Serial.begin(9600);
      while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
  

  
  pwm.begin();
  
  pwm.setPWMFreq(60);  // Analog servos run at ~60 Hz updates

 
  yield();
}


void loop() {
   int counter = 0;
   
   while (Serial.available()>0)
  { 
    msg[counter]=Serial.read();
    movement[counter] = (msg[counter]*101 + 150);
    counter++;
  }
  if(flag == true)
    test = movement[counter];
  Serial.print(test + "-");
  flag = false;
  

  
  Serial.println(movement[counter]);
//  pwm.setPWM(0, 0, 200);
//  pwm.setPWM(1, 0, 200);
//  delay(500);
  pwm.setPWM(0, 0, movement[0]);
  pwm.setPWM(1, 0, movement[1]);
  

  delay(5000);
  Serial.println("test");
 
}
