// Import the HeartRate module
import { HeartRateSensor } from "heart-rate";
import document from "document";

// Create a new instance of the HeartRateSensor object
let hrm = new HeartRateSensor();

hrm.onreading = function() {
  // Peek the current sensor values
  console.log("Current heart rate: " + hrm.heartRate);
  document.getElementById("heartbeatText").textContent = hrm.heartRate;
}

// Begin monitoring the sensor
hrm.start();