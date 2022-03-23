const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const {
  PORT,
  SERVICE_ID,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
} = process.env;

const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

app.get("/login", (req, res) => {
  client.verify.services(SERVICE_ID).verifications.create({
    to: `+91${req.query.phone_no}`,
    body: 'Verify your OTP',
    channel: 'sms'
  }).then((data)=>{
    res.status(201).send(data);
  });
});

app.get("/verify", (req, res) => {
  client.verify.services(SERVICE_ID).verificationChecks.create({
    to: `+91${req.query.phone_no}`,
    code: req.query.code
  }).then((data)=>{
    res.status(201).send(data);
  });
});

app.listen(PORT, () => console.log(`Server started at port number at ${PORT}`));
