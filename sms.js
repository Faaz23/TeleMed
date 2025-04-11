// api/send-sms.js
const twilio = require('twilio');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;
            const fromNumber = process.env.TWILIO_FROM_NUMBER;
            const toNumber = req.body.to;
            const body = req.body.body;

            const client = twilio(accountSid, authToken);

            const message = await client.messages.create({
                body: body,
                from: fromNumber,
                to: toNumber,
            });

            console.log(message.sid);
            res.status(200).send('SMS sent successfully!');
        } catch (error) {
            console.error(error);
            res.status(500).send('Failed to send SMS.');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
};
