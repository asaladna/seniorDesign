import sys
import serial
import struct

import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

ser = serial.Serial('/dev/cu.usbmodem1411', 9600)


class MyHandler(FileSystemEventHandler):
    def on_created(self, event):
        row = 0
        grid=[]
        grid.append([])
        with open(event.src_path) as input_file:
            content =input_file.readlines()
            print (content[0])
            for x in range(len(content[0])):
                if content[0][x] != ',' and content[0][x] != '\n':
                    print(content[0][x])
                    grid[row].append(int(content[0][x]))
                elif content[0][x] == '\n':
                    grid.append([])
                    row = row + 1
            print(ser.name)
            x = ser.read(10)
            i = 0
            # for i in range(row):
            ser.write(struct.pack('>BBB',grid[i][0],grid[i][1],grid[i][2]))

            # print(x)


if __name__ == "__main__":
    event_handler = MyHandler()
    observer = Observer()
    observer.schedule(event_handler, path='./text/', recursive=False)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()