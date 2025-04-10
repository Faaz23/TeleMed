require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors');

const app = express();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioFromNumber = process.env.TWILIO_FROM_NUMBER;

const client = twilio(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post('/send-sms', async (req, res) => {
    console.log("Received SMS request:", req.body);
    const { to, body } = req.body;

    if (!to || !body) {
        console.log("Missing to or body parameters.");
        return res.status(400).send('Missing to or body parameters.');
    }

    console.log("Sending SMS to:", to);
    console.log("SMS body:", body);
    console.log("Twilio Account SID:", accountSid);
    console.log("Twilio Auth Token:", authToken);
    console.log("Twilio From Number:", twilioFromNumber);

    try {
        const message = await client.messages.create({
            from: twilioFromNumber,
            to: to,
            body: body,
        });
        console.log("Twilio message:", message);
        res.send("SMS sent successfully"); // Send a success response
    } catch (error) {
        console.error("Twilio error:", error);
        res.status(500).send('Error sending SMS');
    }
});

module.exports = app;
