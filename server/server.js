//Importing necessary pacakages

import express from "express";

import { deliverMail } from "./handlemail.js";




// Declaring App variables
const PORT = process.env.PORT;
const app = express();

// App Configuration 
app.use(express.static('public/'));
app.set('view engine', 'ejs');
app.use(express.json()) // Body parser for handling json data eg: the date selected by user 
app.use(express.urlencoded({ extended: true }))  // Body Parser for handling urlencoded form data ; attaches the form data into req.body


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
