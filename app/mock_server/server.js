var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send("WOW");
})

app.get('/list_categories', function(req, res) {
  var response = {
    "categories" : ["allo", "allo2"]
  };
  res.send(JSON.stringify(response));
})

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("server running on http://%s:%s", host, port);
})


