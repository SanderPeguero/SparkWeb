const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Resend } = require('resend');

const app = express();
const resend = new Resend('re_MtUsWTYy_LhU1KK7DavrXfZVeQnC2R4q5');

// Configurar el middleware body-parser para analizar el cuerpo de la solicitud JSON
app.use(bodyParser.json());

// Agregar middleware CORS
app.use(cors());

app.post('/send-email-confirmation', async (req, res) => {
    const { from, to, subject, html } = req.body;

    try {
        const { data, error } = await resend.emails.send({
            from: from,
            to: to,
            subject: subject,
            html: html,
        });

        if (error) {
            console.error({ error });
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log({ data });
            res.status(200).json({ message: 'Email sent successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
