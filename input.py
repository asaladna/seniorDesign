import sys
import serial
import struct
import json
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler


#GUI -> Pad


#serial port for aurduino (do not touch)
ser = serial.Serial('/dev/cu.usbmodem1411', 9600)


class MyHandler(FileSystemEventHandler):
    def on_created(self, event):
        grid=[]
        grid.append([])

        #reads in GUI data
        input_file = open(event.src_path).read()
        grid =json.loads(input_file)

        #sets the increment value to higher difference for the pin....    (4 +1)2 = 10
        for x in range(4):
            for y in range(4):
                grid[x][y] = (grid[x][y] + 1) * 2



        print(grid[0][0])
        #pases values and specifies size to Arduino
        ser.write(struct.pack('>BBBBBBBBBBBBBBBB',grid[0][0],grid[0][1],grid[0][2],grid[0][3],grid[1][0],grid[1][1],grid[1][2],grid[1][3],grid[2][0],grid[2][1],grid[2][2],grid[2][3],grid[3][0],grid[3][1],grid[3][2],grid[3][3]))



if __name__ == "__main__":
    #main function
    event_handler = MyHandler()
    observer = Observer()
    #specifies path
    observer.schedule(event_handler, path='./tactile-pad/state/', recursive=False)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()