var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

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

app.post('/decisions', function(req, res) {
  // parse stuff (EZ)
  let userCats = req.body;

  let decision1 = {
    id :"id1",
    title : "i graduated top of my politics class",
    content : "Are you kidding me you little piece of shit i’ll have you know i graduated top of my politics class and i’ve been involved in privilege checking with over 150 confirmed political demonstrations i’m trained in conflict resolution and i was the most oppressed person in my entire upper middle class high school you are nothing to me but another cultural appropriator i will wipe you the fuck out with precision the likes of which have never been seen on this side of the 49th parallel mark my words you think you can get away with saying that shit to me over the internet think again fucker, as we speak i’m checking with my anarcho-communist analyst brigade for your location so you better be prepared to deal with some molotov cocktails and angry feminists flying through your window yOU’RE FUCKING DEAD CHERRY! i can be anywhere at any time and i can kill you in over seven hundred ways and that’s just with me boring you to death while i talk about privilege not only am i extensively trained in hotline management but i have access to an entire arsenal of sociological articles to prove my point and i will use them to wipe your fucking face off the earth you little shit if only you had known what oppressed retribution your cultural appropriation would unleash then maybe you would have held your fucking tongue but you couldn’t you’re fucking dead kiddo",
    categories: userCats
  };
  let decision2 = {
    id :"id1",
    title : "Twitch chat",
    content : "My mom bought me this new laptop and it gets really hot when the chat is being spamed. Now my leg is starting to hurt because it is getting so hot. Please, if you don't want me to get burned, then dont spam the chat.",
    categories : userCats 
  };

  let response = [decision1, decision2];
  res.send(JSON.stringify(response));
})


app.get('/decisions', function(req, res) {
  let categories1 = ["Finance"]; 
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
  let categories2 = ["Affaires et Industriel"]; 
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
  let categories3 = ["Loi et gouvernement"]; 
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


