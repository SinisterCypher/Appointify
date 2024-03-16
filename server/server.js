//Importing necessary pacakages

import express from "express";
import { config } from 'dotenv';
import morgan from "morgan";
import nodemailer from 'nodemailer';
// import ejs from 'ejs';
import fs from 'fs';
import  {promisify} from 'util';
import handlebars from 'handlebars';
import path from "path";

// dotenv configuration: loading environment variables from .env into current node process object
config({ path: './envFiles/.env' });

// Declaring App variables
const PORT = process.env.PORT;
const app = express();

// App Configuration 
app.use(express.static('public/'));
app.set('view engine', 'ejs');
app.use(express.json()) // Body parser for handling json data eg: the date selected by user 
app.use(express.urlencoded({ extended: true }))  // Body Parser for handling urlencoded form data ; attaches the form data into req.body

app.use(morgan('dev'));

// App routes

app.get('/', (req, res) => {
    res.render('index');
})

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
        user: process.env.ADMINEMAIL,
        pass: process.env.ADMINPASSWORD
    }
});
app.post("/submit", async (req, res) => {
    console.log("submite route hit")

    const { firstname, lastname, from, to, message, appointmentDate} = req.body;
    
    const readFile = promisify(fs.readFile);
    const htmlTemplate = await readFile(path.join('./server','/emailnotify.html'), 'utf8'); 
    const template = handlebars.compile(htmlTemplate);
    
    const htmlToSend = template({...req.body});


    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 456,
        secure: true,
        auth: {
            user: process.env.ADMINEMAIL,
            pass: process.env.ADMINPASSWORD
        },
    });


    const mailDetails = {
        from: process.env.ADMINEMAIL,
        to: to,
        subject: message,
        html:htmlToSend
    };


    transporter.sendMail(mailDetails, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log(`Email sent successfully! from ${info.envelope.from} To ${info.envelope.to[0]}`);
        }
    });

    res.json({ message: `Thank you, ${req.body.to} will reach out to you Soon ! ✅` })
});




// Sever ON 
app.listen(PORT, () => {
    console.log(`Sever is Listening on ${PORT}`)
})
