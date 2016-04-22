import sys
import time
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler
import serial
import struct

#Pad -> GUI