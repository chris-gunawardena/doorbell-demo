const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const { google } = require('googleapis');
const gClientPromise = google.auth.getClient();
const app = express();
admin.initializeApp(functions.config().firebase);

const key = 'replace with actual hash';

app.post('/api/unlock', async (req, res) => {
  const reqBody = JSON.parse(req.body);  
  if (reqBody.key != key) {
    res.sendStatus(401);
  } else {
    try {
      await sendConfig(reqBody.deviceId, {
        pin: 3,
        value: 1,
        duration: 1
      });
      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }
});


// Send config
async function sendConfig(deviceId, config) {
  let request = {
    name: `projects/doorbell-demo/locations/europe-west1/registries/iot-registry/devices/${deviceId}`,
    versionToUpdate: 0,
    binaryData: Buffer.from(JSON.stringify(config))
      .toString('base64'),
  };

  return new Promise(async (resolve, reject) => {
    const gClient = await gClientPromise;
    google.options({ auth: gClient });
    google.cloudiot('v1').projects.locations.registries.devices.modifyCloudToDeviceConfig(request, (err, data) => {
      console.info(`Config set to: ${JSON.stringify(config)}`);
      resolve((err && err.message) || data.data);  
    });
  });
}


exports.api = functions.https.onRequest(app);

