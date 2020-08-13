//const fetch = require("node-fetch");
//const HTMLParser = require("node-html-parser");

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const csvParser = require("csv-parse");
const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://test.mosquitto.org");

const config = fs.readFileSync("config.json");
const configObj = JSON.parse(config);
//const NodeCache = require("node-cache");

//const cache = new NodeCache();
const app = express();

const port = process.env.PORT||3000;

const intervals = [];

for (let i = 0; i < configObj.devices.length; i++) {
  const device = configObj.devices[i];
  intervals[i] = startInterval(device);
}

app.use(bodyParser.json({ type: 'application/*+json' }));

app.get("/", (req, res) => {
  res.send(configObj);
});

app.post("/", (req, res) => {
  if (!req.body.command) {
    configObj.device[req.body.deviceId] = { ...configObj.device[req.body.deviceId], ...req.body.settings };
    fs.writeFileSync("config.json", JSON.stringify(req.body));
    res.status(200).send("Config successfully updated.");
  } else {
    const device = configObj.device[req.body.deviceId];
    if (!device.commands.includes(req.body.command)) res.status(400).send("Invalid command for the given device.");

    executeCommand(req.body.deviceId, req.body.command);

    res.status(400).send();
  }
});

function executeCommand(deviceId, command) {
  const device = configObj.device[deviceId];

  if (command == "read") {
    readData(device);
  }
  if (command == "restart") {
    clearInterval(intervals[deviceid]);
    intervals[deviceId] = setInterval(device);
  }
}

function startInterval(device) {
  return setInterval(() => {
    readData(device);
  }, device.interval);
}

function readData(device) {
  client.publish("collect-data");
}

app.listen(port,()=>console.log(`Device service running on port ${port}`));
