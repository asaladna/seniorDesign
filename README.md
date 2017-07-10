[Setup tutorial and app demo!](https://youtu.be/3Wc_f3bGgxU)

# Running the program
1) Open the seniorDesign folder
2) Open the servoOut folder and click on servoOut.ino
3) Upload the program to the board
4) Go back to the root seniorDesign folder
5) Drag and drop startup.sh onto the terminal window
6) Hit enter and run ".../startup.sh"
7) A Gui should be displayed



# Setting the directory path for GUI-> Pad

1) Open up input.py
2)    Go to line 45 (code show below)

observer.schedule(event_handler, path='../tactile-pad/state/', recursive=False)

3)change path='...' to your desired path
4) when running the GUI upload the arduino code to the arduino and run the pyhton program in terminal (python input.py)



# Arduino Install Guide

[Download the Arduino IDE here.](https://www.arduino.cc/en/Main/Software)

to establish connection with arduino
1)In the top menu got to Tools-> Port-> /dev/cu.usbmodem1411  (something similar to this)
NOTE: The bluetooth options are not the right options- If you cannot see the /dev/cu.... then restart your computer
       if that does not work text me

2) to upload the program hit the upload button
if you are still having issues look up [this video](https://www.youtube.com/watch?v=kLd_JyvKV4Y) and skip to 31:00  (ignore the serial port stuff though in the video).
