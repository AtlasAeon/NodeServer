var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('index', {'title': 'Hello!'});
});

app.get('/about', function(req, res){
  res.render('about');
});

app.get('/contact', function(req, res){
  res.render('contact');
});

app.post('/contact/send', function(req, res){
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'cadalethomas95@gmail.com',
      pass: ''
    }
  });

  var mailOptions = {
    from: 'Cadale Thomas <cadalethomas95@gmail.com>',
    to: 'cadalethomas95@hotmail.com',
    subject: 'Website submission',
    text: 'You have a submission with the following details... First Name: ' + req.body.first_name + ' Last Name: ' + req.body.last_name + ' Email: ' + req.body.email + ' Message: ' + req.body.message,
    html: '<p>You have a submission with the following details... </p><ul><li>First Name: ' + req.body.first_name + '</li><li>Last Name: ' + req.body.last_name + '</li><li>Email: ' + req.body.email + '</li><li>Message: ' + req.body.message + '</li></ul>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.redirect('/');
    } else{
      //console.log(req.body.first_name + req.body.last_name + req.body.email + req.body.message)
      console.log('Message Sent: ' + info.response);
      res.redirect('/');
    }
  });
});

app.listen(process.env.PORT || 80);

console.log('Server is running on port ' + (process.env.PORT || 80) + '...');
