var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send("WOW");
})

app.get('/categories', function(req, res) {
  var response = [
    { "name": "Construction" },
    { "name": "Loisir" },
    { "name": "Art" },
    { "name": "Infrastructure" },
    { "name": "Politique" },
  ];
  res.send(JSON.stringify(response));
})

app.get('/decisions', function(req, res) {
  let categories1 = ["transport", "societe"]; 
  let decision1 = {
    id :"id1",
    title : "ceci est une premiere decision",
    content : "Saluuuuuut :D   bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla" + 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla" + 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla" + 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla" + 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"+ 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"+ 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"+ 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"+ 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"+ 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"+ 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"+ 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"+ 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"+ 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"+ 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla",
    categories : categories1 
  };
  let categories2 = ["transport", "societe"]; 
  let decision2 = {
    id :"id1",
    title : "ceci est une premiere decision",
    content : "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla" + 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla" + 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla" + 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla" + 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"+ 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"+ 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"+ 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"+ 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"+ 
      "bla bla bla bla bla bla bla bla blbla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla",
    categories : categories2 
  };
  let categories3 = ["transport", "societe"]; 
  let decision3 = {
    id :"id1",
    title : "ceci est une premiere decision",
    content : "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla" + 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla" + 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla" + 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla" + 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"+ 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"+ 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"+ 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"+ 
      "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"+ 
      "bla bla bla bla bla bla bla bla blbla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla",
    categories : categories3 
  };
  let response = [decision1, decision2, decision3];
  res.send(JSON.stringify(response));
})

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("server running on http://%s:%s", host, port);
})


