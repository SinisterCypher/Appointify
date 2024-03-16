import nodemailer from 'nodemailer';
import fs from 'fs';
import { promisify } from 'util';
import handlebars from 'handlebars';
import path from "path";
import { config } from 'dotenv';
config({ path: './envFiles/.env' });

// Path resolving
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

const IMG_1_URL = "/icons/front-shapes.png";
const IMG_2_URL = "/icons/Background.svg";


export async function deliverMail(reqbody) {


  const readFile = promisify(fs.readFile);
  const { to, message } = reqbody;
  const htmlTemplate = await readFile(path.join('./server', '/emailnotify.html'), 'utf8');
  const template = handlebars.compile(htmlTemplate);

  const htmlToSend = template({ ...reqbody, IMG_1_URL, IMG_2_URL });

  const mailDetails = {
    from: process.env.ADMINEMAIL,
    to: to,
    subject: message,
    html: htmlToSend,
    attachments: [
      {
        filename: "front-shapes.png",
        path:"G:\\Learning Programming\\Projects\\Appointment Scheduler\\public\\icons\\front-shapes.png",
        cid: "front-shape"
      },
      {
        filename: "Background.svg",
        path: 'G:\\Learning Programming\\Projects\\Appointment Scheduler\\public\\icons\\Background.svg',
        cid: "background-svg"
      },

    ]
  };

  transporter.sendMail(mailDetails, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log(`Email sent successfully! from ${info.envelope.from} To ${info.envelope.to[0]}`);
    }
  });
}


