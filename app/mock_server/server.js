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

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("server running on http://%s:%s", host, port);
})


