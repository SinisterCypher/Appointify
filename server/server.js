//Importing necessary pacakages

import express from "express";
import {config} from 'dotenv'; 
import morgan from "morgan";

// dotenv configuration: loading environment variables from .env into current node process object
config({path: './envFiles/.env'});

// Declaring App variables
const PORT = process.env.PORT;
const app = express(); 

// App Configuration 
app.use(express.static('public/'));
app.set('view engine','ejs');
app.use(express.json()) // Body parser for handling json data eg: the date selected by user 
app.use(express.urlencoded({extended: true}))  // Body Parser for handling urlencoded form data ; attaches the form data into req.body

app.use(morgan('dev')); 

// App routes

app.get('/', (req,res)=>{
  res.render('index');
} )


app.post("/submit",(req,res)=>{
    console.log("submite route hit")
    console.log(req.body)
    console.log(req.body.firstname); 
    res.json({message:"Thank you, I'll reach out to you Soon ! ✅"})
    
})



// Sever ON 
app.listen(PORT, ()=>{
    console.log(`Sever is Listening on ${PORT}`)
})
