const socket = io("http://localhost:4000");
const telemetryDiv = document.getElementById("telemetry");
const alertsDiv = document.getElementById("alerts");

socket.on("telemetry", (data) => {
  telemetryDiv.innerHTML = `
    <p><strong>Timestamp:</strong> ${data.timestamp}</p>
    <p><strong>Altitude:</strong> ${data.altitude} m</p>
    <p><strong>Temperature:</strong> ${data.temperature} °C</p>
    <p><strong>Battery:</strong> ${data.battery} %</p>
    <p><strong>Signal Strength:</strong> ${data.signal_strength} %</p>
  `;

  const alerts = [];
  if (data.battery < 30) alerts.push("Low Battery");
  if (data.altitude < 18000) alerts.push("Low Altitude");

  if (alerts.length > 0) {
    alertsDiv.innerHTML = `
      <h2>Alerts</h2>
      <ul>${alerts.map(a => `<li>${a}</li>`).join("")}</ul>
    `;
  } else {
    alertsDiv.innerHTML = "";
  }
});