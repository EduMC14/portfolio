import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path';

dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Servir contenido estático
app.use(express.static(path.join(__dirname, '../dist/astro')))

app.post('/send', (req, res) => {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    });

    

    const mailOptions = {
        from: email,
        to: process.env.EMAIL,
        subject: `Contacto de ${name} correo${email}: ${subject}`,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Mensaje enviado: ' + info.response);
    });
});

// Servir el archivo estático en la raíz
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/astro/', 'index.html'));
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});