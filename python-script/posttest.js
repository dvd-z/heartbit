function postHeartrates(heartrates) {
  fetch(`http://40.76.211.223:3000/fitbit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(heartrates)
  })
  .then(res => res.json())
  .then(function(data) {
    console.log(data);
    console.log(data.hello);
  })
  .catch(err => console.log('Error: ' + err));
}