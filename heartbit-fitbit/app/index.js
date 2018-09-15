import { HeartRateSensor } from "heart-rate";
import document from "document";

// Create a new instance of the HeartRateSensor object
let hrm = new HeartRateSensor();
let lastSent = 0;
let heartRates = [];

hrm.onreading = function() {
  // Peek the current sensor values
  console.log("Current heart rate: " + hrm.heartRate);
  document.getElementById("bpm").textContent = hrm.heartRate;
  heartRates.push(hrm.heartRate)
  // POST every 5 seconds
  if (hrm.timestamp - lastSent >= 5000) {
    console.log(heartRates);
    // POST to server
    // Check for null/empty/very few elements (implies poor data)
    lastSent = hrm.timestamp;
    heartRates = [];
  }
}

// Begin monitoring the sensor
lastSent = hrm.timestamp;
hrm.start();