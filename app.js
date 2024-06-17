const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
/* BASE DE DATOS */
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

require('dotenv').config()
const uri = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@nodejs.hgyhsse.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority&appName=nodejs`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))
/* FIN BDD */
// Motor de plantilla
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render('index',{
    titulo : "titulo",
    descripcion: "descripcion"
  });
});


//Rutas web
app.use('/', require('./router/rutas'));
app.use('/mascotas', require('./router/Mascota'));
app.get("/servicios", (req, res) => {
  res.render('servicios',{titulo : "servicios"});
});

app.use((req, res,next) => {
  res.render('404');
});
app.use(express.static(__dirname +'/public'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});