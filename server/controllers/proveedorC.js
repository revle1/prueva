const express = require('express');
const app = express();

const proveedor = require("../models/proveedorM");


app.get('/', function (req, res) {
    res.json({
        'succes' : true,
        'Saludo' : 'Bienvenido a la APPI AGENDA..',
        'data': []
      })
  });
  
app.get('/proveedor', function (req, res) {

    proveedor.find({})
            .exec((err, proveedorList) => {
                if(err){
                    return res.status(400).json({
                        'succes' : false,
                        'Saludo' : err,
                        'data': []
                    });
                }
                return res.json({
                    'succes' : true,
                    'Saludo' : 'Lista de proveedor',
                    'data': [proveedorList]
                    })
            });

    
    });

  
app.post('/proveedores', function (req, res) {
        let datos = req.body;
        let proveedores = new proveedores({
            nomprovee: datos.proveedor,
            nit: datos.nit,
            telefono: datos.telefono,
            dirreccion: datos.dirreccion,
            correo: datos.correo,
            password: datos.password
        });

        proveedores.guardar((err, proveedorDB) => {
            if(err){
                return res.status(400).json({
                    'succes' : false,
                    'Saludo' : err,
                    'data': []
                });
            }
            return res.json({
                'succes' : true,
                'Saludo' : 'Proveedores guardado',
                'data': [proveedorDB]
                })
        });
});

  

app.get('/proveedor/:id', function (req, res) {
    let id = req.params.id;

    proveedor.findById(id)
    .exec((err, proveedorDetail) => {
        if(err){
            return res.status(400).json({
                'succes' : false,
                'Saludo' : err,
                'data': []
            });
        }
        return res.json({
            'succes' : true,
            'Saludo' : 'Lista de proveedor',
            'data': [proveedorDetail]
            })
    });


    });
  

app.put('/proveedores/:id', function (req, res) {
    let id = req.params.id;
    let datos = req.body;
        proveedores.findByIdAndUpdate(id, datos, {new : true, runValidators : true}, (err, proveedorDB) => {
            if(err){
                return res.status(400).json({
                    'succes' : false,
                    'Saludo' : err,
                    'data': []
                });
            }
            if(proveedorDB){
                return res.status(400).json({
                    'succes' : false,
                    'mensaje' : 'Proveedor no se encuentra',
                    'data': []
                });
            }
            return res.json({
                'succes' : true,
                'Saludo' : 'Proveedor borrado',
                'data': [proveedorDB]
                })
        });

});


app.delete('/proveedores/:id', function (req, res) {
    let id = req.params.id;
    let datos = {active : false};
    proveedores.findByIdAndUpdate(id, datos, {new : true, runValidators : true}, (err, proveedorDB) => {
        if(err){
            return res.status(400).json({
                'succes' : false,
                'Mensaje' : err,
                'data': []
            });
        }
        return res.json({
            'succes' : true,
            'Mensaje' : 'Proveedor  actualizado',
            'data': [proveedorDB]
            })
    });

});

module.exports = app;