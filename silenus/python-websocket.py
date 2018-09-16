from websocket import create_connection
ws = create_connection("ws://40.76.211.223:8000/openpose", subprotocols=["echo-protocol"])
print("Sending 'Hello, World'...")
ws.send("Hello, World")
print("Sent")
