var express = require("express");
var app     = express();
var PORT    = 3000;

var middleware = {
    requireAuthentication : function(req, res, next){
        console.log("private route hit");
        next();
    },
    logger : function(req, res, next){

        var date = new Date().toString();
        console.log("Requested at : "  + date + " " + req.method + " " + req.originalUrl);
        next();
    }
}


// middleware 2 seviyede yapilabilir.. application seviyesinde yapilabilir. ve route seviyesinde yapilabilir..
// Application seviyesinde yapildiginda tanimlama route işlemlerinin üstünde OLMAK ZORUNDADIR...
// app.use(middleware.requireAuthentication);

// route seviyesinde yaplidiginda ise tanimlama route içerisinde 2.parametere olarak yapilabilir..
// app.get("/about", middleware.requireAuthentication, function(req, res){

// app.get("/", function(req, res){
//     res.send("Hello Express");
// })

// app.use(middleware.requireAuthentication);
app.use(middleware.logger);


app.get("/about", middleware.requireAuthentication, function(req, res){
    res.send("About Page");
})

app.use(express.static(__dirname + "/public"))

// listen içerisine istenirse 3.bir parametre alabilir.. bu da server başladığında bir işlem yapmamıza olanak saglar.. bu parametre ise bir fonksiyondur..
app.listen(PORT, function(){
    console.log("Server Started on port " + PORT);
});