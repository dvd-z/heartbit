from websocket import create_connection
ws = create_connection("ws://40.76.211.223:8080/")
print("Sending 'Hello, World'...")
ws.send("Hello, World")
print("Sent")
