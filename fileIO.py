import sys
import time
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler
import serial
import struct

# ser = serial.Serial('/dev/cu.usbmodem1411', 9600)
row = 0
grid=[]
grid.append([])

class MyHandler(PatternMatchingEventHandler):
    patterns = ["*.txt"]

    def process(self, event):
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


    ser.close()
    """
    event.event_type
        'modified' | 'created' | 'moved' | 'deleted'
    event.is_directory
        True | False
    event.src_path
        path/to/observed/file
    """
        # the file will be processed there

    # def on_modified(self, event):
    #     self.process(event)

    def on_created(self, event):
        self.process(event)


if __name__ == '__main__':
    args = sys.argv[1:]
    observer = Observer()
    observer.schedule(MyHandler(), path=args[0] if args else '.')
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()

    observer.join()


# ser = serial.Serial('/dev/cu.usbmodem1411', 9600)
# row = 0
# grid=[]
# grid.append([])
# with open("input.txt") as input_file:
#     content =input_file.readlines()
#     print (content[0])
#     for x in range(len(content[0])):
#         if content[0][x] != ',' and content[0][x] != '\n':
#             print(content[0][x])
#             grid[row].append(int(content[0][x]))
#         elif content[0][x] == '\n':
#             grid.append([])
#             row = row + 1





def writeToPin(grid,row):
    print(ser.name)
    x = ser.read(10)
    i = 0
    # for i in range(row):
    print(grid[i][0], grid[i][1])
    ser.write(struct.pack('>BBB',grid[i][0],grid[i][1],grid[i][2]))
    # print(x)

writeToPin(grid,row)
print("-----")

ser.close()
