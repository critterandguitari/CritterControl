import cherrypy

config = { '/': 
        {
        }
}
base = '/helloworld'
name = 'Hello World'

class Root(object):
    @cherrypy.expose
    def index(self):
        return "Hello World!"
