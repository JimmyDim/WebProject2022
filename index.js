const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/adminLogin', (req,res)=>{
    res.render('adminLogin.ejs');
})

app.get('/dataAdministration', (req,res)=>{
    res.render('dataAdministration.ejs')
})

app.get('/statistics', (req, res)=>{
    res.render('statistics.ejs')
})

app.listen(3000, ()=>{
    console.log("Listening on port 3000!");
})
