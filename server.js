const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials')



app.set('view engine','hbs');



app.use((req,res,next) => {
    let now = new Date().toString();
    log = now + ':' + req.method+req.url;
    console.log(log);
    fs.appendFile('server.log',log + '\n')
    next();
});

// app.use((req,res,next) => {
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => 
    new Date().getFullYear()
)

hbs.registerHelper('sreamIt', (text) => text.toUpperCase())

app.get('/',(req,res) =>{
    res.render('home.hbs',{
        welcomeMessage: 'welcome',
        header: 'home',
        pageTitle:'homepage',

    }); 
})

app.get('/about',(req,res) =>{
    res.render('about.hbs',{
        header: 'about',
        pageTitle:'About pageTitle',
        currentYear: new Date().getFullYear()
    }); 
})

app.get('/bad',(req,res) => {
   res.send(
       {error:"1000"}
       )
})

app.listen(3000);