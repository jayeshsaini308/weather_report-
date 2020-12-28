const express=require("express");
const https = require("https");
const app = express();
const bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.get("/", function( req ,res ){
  res.sendFile(__dirname+"/index.html")
});
app.post("/",function (req, res) {
  const query= req.body.CityName;
  const apikey="b719efd703d0a1f544e67c47f7e57f18"
  var url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=metric"
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData=JSON.parse(data);
      const temp = weatherData.main.temp;
      const  des=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imageURL="http://openweathermap.org/img/wn/" + icon + "@2x.png"
  res.write("good morning to all my friends");
  res.write(" todays " +req.body.CityName + " temprature is "+temp);

  res.sendFile(__dirname+"/index.html")
  res.send();
});
});
})
app.listen(3000, function(){
  console.log("server is running on port 3000.");

});
