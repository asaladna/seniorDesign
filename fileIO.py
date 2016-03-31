import sys
import serial
import struct
ser = serial.Serial('/dev/cu.usbmodem1411', 9600)
row = 0
grid=[]
grid.append([])
with open("input.txt") as input_file:
    content =input_file.readlines()
    print (content[0])
    for x in range(len(content[0])):
        if content[0][x] != ',' and content[0][x] != '\n':
            print(content[0][x])
            grid[row].append(int(content[0][x]))
        elif content[0][x] == '\n':
            grid.append([])
            row = row + 1




for i in range(3):
    print(grid[0][i])



def writeToPin(grid,row):
    print(ser.name)
    x = ser.read(10)
    i = 0
    # for i in range(row):
    ser.write(struct.pack('>BBB',grid[i][0],grid[i][1],grid[i][2]))
    # print(x)


writeToPin(grid,row)

ser.close()