import document from "document";
// Import the messaging module
import * as messaging from "messaging";

console.log("Companion code started");

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(e) {
  // Output the message to the console
  console.log("Package received in companion!");
  var parcel = e.data;
  console.log("Package: " + JSON.stringify(parcel));
  postHeartrates(parcel);
}

function postHeartrates(heartrates) {
  fetch("http://40.76.211.223:8000/fitbit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(heartrates)
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log('Error: ' + err));
}
