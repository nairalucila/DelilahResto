const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');

//CONFIGURACION
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.post('/', (req, res) => {
    res.json(req.body);
  })

//RUTAS

app.get('/', (req, res)=>{

    res.send('Hola mundo');
})

//SERVIDOR

app.listen(3000, () =>{
 console.log('servidor funcionando');
});