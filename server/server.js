const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());
 
app.use( require("./controllers/proveedorC.js"));



  mongoose.connect('mongodb://localhost:27017/agenda', {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }, (err, res) => {
        if(err) throw err;
        console.log("Conectado a la DB");
  });

  let port = process.env.PORT || 3000;

//Servidor 
app.listen(3000, () => {
    console.log(`Servidor EN LINEA en el puerto ${ port}`);
});