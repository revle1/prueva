const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let proveedorSchema = new Schema({
    nomprovee:{
        type: String,
        require:[true, 'El nompre del proveedor es obligatorio']
    },
    
    nit:{
        type: String,
        require:[true, 'El nit es obligatorio']
    },

    telefono:{
        type: Number,
        require:[true, 'El telefono es obligatorio']
    },

    dirreccion:{
        type: String,
        require:[true, 'La dirreccion es obligatoria']

    },

    correo:{
        type: String,
        require:[true, 'El correo es obligatorio']
    },

    password:{
        type: String,
        require: false,
        require:[true, 'El pasword es obligatorio']

    }
});

module.exports = mongoose.model("proveedor", proveedorSchema);