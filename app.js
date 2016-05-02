var subdomain = require('express-subdomain');
var mg = require('nodemailer-mailgun-transport');
var server = require('./server');
var nodemailer = require('nodemailer');
var tabletopsquire = require('./TableTopSquire/server');
var madcapserver = require('./MadCap_Server/server');
var app = server.app;
var io = server.io;
var path = require('path');
var hbs = require('express-hbs');
var mgConfig = require('./mailgun');
var mailgunTransport = nodemailer.createTransport(mg(mgConfig.auth));
app.use(subdomain('tabletopsquire', tabletopsquire.app));
app.use(subdomain('one2many', madcapserver.app));
app.get('/', function(req, res){
    res.render('pages/home');
});
app.post('/send', function(req, res){
    var contactOptions={
        to : mgConfig.email,
        from: mgConfig.email,
        subject : "michaelkimball.info Contact Form",
        text : req.body.firstname + " " + req.body.lastname + " <" + req.body.email +
        ">\n\n" + req.body.message
    };
    var autoResponseOptions={
        to: req.body.email,
        from: "Michael Kimball <" + mgConfig.email + ">",
        subject: "michaelkimball.info Contact Form",
        text: "Thank you for attempting to contact Michael Kimball. I have received your message and will attempt respond as soon as possible."
    };
    console.log(contactOptions);
    mailgunTransport.sendMail(contactOptions, function(error, response){
        if(error){
            console.log(error);
            res.send(error.message);
        }else{
            console.log("Message sent: " + response.message);
        }
    });
    mailgunTransport.sendMail(autoResponseOptions, function(error, response){
        if(error){
            console.log(error);
            res.send(error.message);
        }else{
            console.log("Message sent: " + response.message);
            res.send("sent");
        }
    });
});