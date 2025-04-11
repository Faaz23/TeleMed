// api/send-sms.js
const twilio = require('twilio');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;
            const fromNumber = process.env.TWILIO_FROM_NUMBER;
            const toNumber = process.env.TO_NUMBER;

            console.log('Twilio Credentials:', { accountSid, fromNumber, toNumber }); // Log credentials

            const client = twilio(accountSid, authToken);

            const message = await client.messages.create({
                body: 'Your SMS message here!',
                from: fromNumber,
                to: toNumber,
            });

            console.log('Twilio Message SID:', message.sid); // Log message SID

            res.status(200).send('SMS sent successfully!');
        } catch (error) {
            console.error('Twilio Error:', error); // Log the error
            res.status(500).send('Failed to send SMS.');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
};
