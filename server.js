var express = require('express'); // Require Express
var fs = require("fs"); // Require the module required for writing data
var bodyParser = require("body-parser"); // Require the module required for using form data
var app = express();

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application
app.set('view engine', 'ejs'); // Set EJS

// make use of static files
app.use(express.static(__dirname + '/views/app/css'));
app.use(express.static(__dirname + '/views/app/'));

// ****************************************//
//                root                     //
// *************************************** //

app.get('/', (req, res) => {
  res.render('app/index', {
    content_title: "Life is wonderful!",
    content_text: "Please, enjoy all the small things in your life :)"
  });
});

// ****************************************//
//                 newmessage              //
// *************************************** //

app.get('/newmessage', (req, res) => {
  res.render('app/index-newmessage')
});

var json = JSON.parse(require('fs').readFileSync('data.json', 'utf8'));
var options = { day: 'numeric', weekday: 'long', month: 'long', year: 'numeric', }; // hifitelyä
var date = new Date();

// User inputs data to the form
app.post('/newmessage', (req, res) => {

// push data to json-object
json.push({
  "username": req.body.username,
  "country": req.body.country,
  "message":req.body.message,
  "profession":req.body.profession,
  "date": date.toLocaleDateString("en-US", options)
});

// Parse json-object and write data to data.json-file
var jsonStr = JSON.stringify(json, null, 4);
fs.writeFileSync('data.json', jsonStr);

// renderöidään index-newmessage.ejs sivu
res.render('app/index-newmessage')
});

// ****************************************//
//                /guestbook               //
// *************************************** //

// Render index-guestbook.ejs
app.get('/guestbook', (req, res) => {
  res.render('app/index-guestbook', {
    content_title: "This is the questbook section",
    content_text: "Please, write something down :)",
    content_heading: "GUESTBOOK",
    json: json
  });
});

// ****************************************//
//      404 route for undefined routes     //
// *************************************** //

// The 404 Route (Not Found route)
app.get('*', function(req, res){
  res.send('Sorry, could not find the requested page', 404);
});

// ****************************************//
//                port                  //
// *************************************** //

app.listen(8081, () => {
  console.log('Serveri käynnistyy portista 8081..');
});
