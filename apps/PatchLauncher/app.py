import os.path
import time
import glob
import json
import cherrypy
import urllib
import time
import socket
from cherrypy.lib import static
import imp

current_dir = os.path.dirname(os.path.abspath(__file__))
info = imp.load_source('info', current_dir + '/info.py')

config = { '/': 
        {
 		'tools.staticdir.on': True,
		'tools.staticdir.dir': current_dir + '/static/',
		'tools.staticdir.index': 'index.html',
        }
}

base = '/patchselect'
name = 'Patch Selector'

class Root():

    def tester(self):
        return "TESTdf"
        print "cool"
    tester.exposed = True
 
    def info(self):
        cherrypy.response.headers['Content-Type'] = "application/json"
        return json.dumps(info.get_all_info(), indent=4, encoding='utf-8')
    info.exposed = True
  
    def current(self):
        return info.get_current_patch()
    current.exposed = True
    
    def list_patches(self):
        cherrypy.response.headers['Content-Type'] = "application/json"
        return json.dumps(info.get_all_patches())
    list_patches.exposed = True

    def select_patch(self, patch) :
        patch_file = open('/home/pi/Patch/current', 'w')
        patch_file.write(patch)
        info.run_cmd("systemctl restart playpatch")
        return patch
    select_patch.exposed = True

    def control(self, **data):
        
        ret = ''
        if 'operation' in data :
            cherrypy.response.headers['Content-Type'] = "application/json"
            print str(data['operation'])
            #return json.dumps(info.get_all_info(), indent=4, encoding='utf-8')
            return info.get_all_info()
        else :
            cherrypy.response.headers['Content-Type'] = "application/json"
            return "no operation specified"

    control.exposed = True


