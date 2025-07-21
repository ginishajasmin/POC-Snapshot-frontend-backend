const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
const cors = require('cors');
var sesTransport = require('nodemailer-ses-transport');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/send-snapshot', async (req, res) => {
    const { image } = req.body;
    const base64Data = image.replace(/^data:image\/png;base64,/, '');
    const filename = 'snapshot.png';

    fs.writeFileSync(filename, base64Data, 'base64');

    let sesCredentials = { accessKeyId: "", secretAccessKey: "", region: "" }

    var transporter = nodemailer.createTransport(sesTransport(sesCredentials));

    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //     user: 'your_email@gmail.com',     // <-- your Gmail address
    //     pass: 'your_app_password',        // <-- your Gmail App Password
    //     },
    // });

    const mailOptions = {
        from: 'BDO Insyts <noreply@insyts.co>',
        to: 'ginishajasminwaila@gmail.com',
        subject: 'Snapshot Report',
        text: 'Please find the attached snapshot.',
        attachments: [{ filename, path: `./${filename}` }],
    };

    console.log("mailOptions", mailOptions);

    transporter.sendMail(mailOptions, (err, info) => {
        fs.unlinkSync(filename);
        if (err) {
            console.error(err);
            return res.status(500).send('Email sending failed');
        }
        res.send('Email sent successfully!');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
