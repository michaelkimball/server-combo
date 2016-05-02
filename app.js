var subdomain = require('express-subdomain');
var server = require('./server');
var nodemailer = require('nodemailer');
var tabletopsquire = require('./TableTopSquire/server');
var madcapserver = require('./MadCap_Server/server');
var app = server.app;
var io = server.io;
var path = require('path')
var bodyParser = require('body-parser');
var hbs = require('express-hbs');

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "",//TODO add email
        pass: "" //TODO add password
    }
});
//app.set('view engine', 'hbs');
//app.set('views', path.join(__dirname, '/MadCap_Server/views'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(subdomain('tabletopsquire', tabletopsquire.app));
app.use(subdomain('one2many', madcapserver.app));
app.get('/', function(req, res){
    res.render('pages/home');
});
app.post('/send', function(req, res){
    var mailOptions={
        to : "my-email", //TODO add email
        from: req.body.from,
        subject : "michaelkimball.info Contact Form",
        text : req.body.message
    };
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});