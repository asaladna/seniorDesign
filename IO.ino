
int ledPin[13];      // the number of the LED pin
int ledState[13];
unsigned long previousMillis[13];
long OnTime[13];
long OffTime[13];
int msg[3];
void setup() 
{
  for (int i = 0; i < 13; i++) {
        pinMode(i, OUTPUT);
     }
    Serial.begin(9600);
    Serial.print("Program Initiated\n");    
  for(int i = 0; i < 13; i++)
  {
    ledState[i] = LOW;             // ledState used to set the LED
    previousMillis[i] = 0;        // will store last time LED was updated
    OffTime[i] = 500;
  } 
}
 
void loop()
{
 
  int counter = 0;
  while (Serial.available()>0)
  { 
    msg[counter]=Serial.read();
    OnTime[counter] = msg[counter] * 10;
    counter++;
  }
  OnTime[0]= 10;
  OnTime[1]= 200;
  OnTime[2]= 40;
  counter = 3;
  // check to see if it's time to change the state of the LED
  unsigned long currentMillis = millis();
   for(int i = 0; i < counter; i++)
  {
    
    if((ledState[i] == HIGH) && (currentMillis - previousMillis[i] >= OnTime[i]))
    {
      Serial.println("OFF");
      Serial.println(i);
      ledState[i] = LOW;  // Turn it off
      previousMillis[i] = currentMillis;  // Remember the time
      digitalWrite(i+2, ledState[i]);  // Update the actual LED
    }
    else if ((ledState[i] == LOW) && (currentMillis - previousMillis[i] >= OffTime[i]))
    {
      Serial.println("On");
      Serial.println(i);
      ledState[i] = HIGH;  // turn it on
      previousMillis[i] = currentMillis;   // Remember the time
      digitalWrite(i+2, ledState[i]);    // Update the actual LED
    }
  }

}
