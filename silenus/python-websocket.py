from twisted.internet import reactor
from autobahn.twisted.websocket import WebSocketClientFactory, WebSocketClientProtocol, connectWS


class EchoClientProtocol(WebSocketClientProtocol):

   def sendHello(self):
      self.sendMessage("Hello, world!")

   def onOpen(self):
      self.sendHello()

   def onMessage(self, msg, binary):
      print "Got echo: " + msg
      reactor.callLater(1, self.sendHello)


if __name__ == '__main__':

   factory = WebSocketClientFactory("ws://40.76.211.223:8080/")
   factory.protocol = EchoClientProtocol
   connectWS(factory)
   reactor.run()
