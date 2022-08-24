const express = require("express");
const fs = require("fs")
const path = require("path");
const app = express();
var bodyParser = require('bodyparser');
const mongoose = require("mongoose");
main().catch(err => console.log(err));
async function main(){
   await mongoose.connect('mongodb://localhost:27017/dance')
};
const port = 8000;

const contactSchema = new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
    desc:String,
});

const Contact = mongoose.model('contact', contactSchema);

app.use('/static', express.static('static'));

app.use(express.urlencoded());

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res)=>{
    const params = {};
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("this data has been saved to the database")
    }).catch(()=>{
        res.status(404).send("item was not saved to database")
    });
    
});

// app.post('/contact', (req, res)=>{
//     name = req.body.name
//     phone = req.body.phone
//     email = req.body.email
//     address = req.body.address
//     desc = req.body.desc
//     let outputTOWrite = `The client data is 
//                         ${name} 
//                         ${phone} 
//                         ${email} 
//                         ${address} 
//                         ${desc}`
//     fs.writeFileSync('output.txt', outputTOWrite);
//     const params = {};
//     res.status(200).render('contact.pug', params);
// });

app.listen(port, ()=>{
    console.log(`the application started successfully on port ${port}`);
});