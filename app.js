var subdomain = require('express-subdomain');
var server = require('./server');
var tabletopsquire = ('./TableTopSquire/server');
var madcapserver = ('./MadCap_Server/server');
var app = server.app;
var io = server.io;
var bodyParser = require('body-parser');
var hbs = require('express-hbs');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/MadCap_Server/views'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(subdomain('tabletopsquire', tabletopsquire));
app.use(subdomain('madcapserver', madcapserver));
app.get('/', function(req, res){
    res.send("Hi");
});
