import document from "document";
// Import the messaging module
import * as messaging from "messaging";

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(e) {
  // Output the message to the console
  console.log("Package received in companion!");
  var parcel = e.data;
  console.log("Package: " + JSON.stringify(parcel));
  var result = postHeartrates(parcel);
  console.log("Result: " + JSON.stringify(result));
}

console.log("Companion code started");

function postHeartrates(heartrates)  {
  fetch(`http://40.76.211.223:3000/fitbit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(heartrates)
  })
  .then(function(res) {
    console.log("Result: ")
    return res.json();
  })
  .catch(err => console.log('Error: ' + err));
}
