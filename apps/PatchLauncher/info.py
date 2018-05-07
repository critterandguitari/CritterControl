import os
import imp
import sys
import time
import threading
import subprocess
import socket


def get_immediate_subdirectories(dir) :
    return [name for name in os.listdir(dir)
            if os.path.isdir(os.path.join(dir, name))]

# returns output if exit code 0, NA otherwise
def run_cmd(cmd) :
    ret = 'None'
    try:
        ret = subprocess.check_output(['bash', '-c', cmd], close_fds=True)
    except: pass
    return ret

def get_current_patch() :
    with open('/home/pi/Patch/current') as f:
        first_line = f.readline()
    return first_line

def get_all_patches() :
	return get_immediate_subdirectories('/home/pi/Onda_Patches')


def get_all_info() :
    # get info
    cpu = str(100 - int(run_cmd("vmstat 1 2|tail -1|awk '{print $15}'"))) + " %"
    midi_dev =  run_cmd("aplaymidi -l | awk '{if (NR==2) print $2}'")
    if (midi_dev == ""): midi_dev = 'None'
    version = "0.1"
    patch = "ABCD Cool"#run_cmd("ls /tmp/curpatchname")
    ip_address = socket.gethostbyname(socket.gethostname())
    host_name = run_cmd("ps aux | grep 'avahi.*running' | awk 'NR==1{print $13}' | sed 's/\[//' | sed 's/]//'")

    # check for wifi
    ssid = "Something"

    info_items = {
    "CPU": cpu,
    "MIDI Device": midi_dev,
    "Version": version,
    "Patch": patch,
    "IP Address": ip_address,
    "Host Name": host_name
    }
    
    return info_items




