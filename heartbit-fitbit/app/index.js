import { HeartRateSensor } from "heart-rate";
import document from "document";
// Import the messaging module
import * as messaging from "messaging";

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  // Ready to send or receive messages
  console.log("Socket open!");
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
}

// Create a new instance of the HeartRateSensor object
let hrm = new HeartRateSensor();
let lastSent = 0;
let heartrates = [];

hrm.onreading = function() {
  // Peek the current sensor values
  console.log("Current heart rate: " + hrm.heartRate);
  document.getElementById("bpm").textContent = hrm.heartRate;
  heartrates.push(hrm.heartRate);
  // Send every 5 seconds
  if (hrm.timestamp - lastSent >= 5000) {
    console.log("Package: " + heartrates);
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      // Send data to companion as a message
      var parcel = {
        heartrates: heartrates
      }
      messaging.peerSocket.send(parcel);
    } else {
      console.log("Failed to send to companion.");
    }
    // Check for null/empty/very few elements (implies poor data)
    lastSent = hrm.timestamp;
    heartrates = [];
  }
}

// Begin monitoring the sensor
lastSent = hrm.timestamp;
hrm.start();