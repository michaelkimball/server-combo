var subdomain = require('express-subdomain');
var server = require('./server');
var tabletopsquire = ('./TableTopSquire/server');
var madcapserver = ('./MadCap_Server/server');
var app = server.app;
var io = server.io;
var path = require('path')
var bodyParser = require('body-parser');
var hbs = require('express-hbs');

//app.set('view engine', 'hbs');
//app.set('views', path.join(__dirname, '/MadCap_Server/views'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(subdomain('tabletopsquire', tabletopsquire.router));
app.use(subdomain('madcapserver', madcapserver.router));
app.get('/', function(req, res){
    res.send("Hi");
});
