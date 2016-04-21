import sys
import serial
import struct
import json
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

ser = serial.Serial('/dev/cu.usbmodem1411', 9600)


class MyHandler(FileSystemEventHandler):
    def on_created(self, event):
        grid=[]
        grid.append([])

        input_file = open(event.src_path).read()
        grid =json.loads(input_file)


        for x in range(4):
            for y in range(4):
                # grid[x][y] = bytes(chr((grid[x][y] + 1) * 2).encode())
                # ser.write(grid[x][y])
                grid[x][y] = (grid[x][y] + 1) * 2



        print(grid[0][0])
        # ser.write([ord(grid[0][0])])


        ser.write(struct.pack('>BBBBBBBBBBBBBBBB',grid[0][0],grid[0][1],grid[0][2],grid[0][3],grid[1][0],grid[1][1],grid[1][2],grid[1][3],grid[2][0],grid[2][1],grid[2][2],grid[2][3],grid[3][0],grid[3][1],grid[3][2],grid[3][3]))



if __name__ == "__main__":
    event_handler = MyHandler()
    observer = Observer()
    observer.schedule(event_handler, path='../tactile-pad/state/', recursive=False)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()