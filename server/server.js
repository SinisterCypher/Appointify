//Importing necessary pacakages

import express from "express";
import morgan from 'morgan';
import { deliverMail } from "./handlemail.js";
// dotenv configuration: loading environment variables from .env into current node process object



// Declaring App variables
const PORT = process.env.PORT;
const app = express();

// App Configuration 
app.use(express.static('public/'));
app.set('view engine', 'ejs');
app.use(express.json()) // Body parser for handling json data eg: the date selected by user 
app.use(express.urlencoded({ extended: true }))  // Body Parser for handling urlencoded form data ; attaches the form data into req.body


// App Configuration 
app.use(express.static('public/'));
app.set('view engine', 'ejs');
app.use(express.json()) // Body parser for handling json data eg: the date selected by user 
app.use(express.urlencoded({ extended: true }))  // Body Parser for handling urlencoded form data ; attaches the form data into req.body

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}


// App routes

app.get('/', (req, res) => {
    res.render('index');
})


// Set Appointment Route
app.post("/submit", async (req, res) => {
    
   await deliverMail(req.body); // Function to send mail.

    res.json({ message: `Thank you, ${req.body.to} will reach out to you Soon ! ✅` })
});


// Sever ON 
app.listen(PORT, () => {
    console.log(`Sever is Listening on ${PORT}`)
})
