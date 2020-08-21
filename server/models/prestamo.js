const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');
const Libro = require('./libro');


let Schema = mongoose.Schema;

let prestamoSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: [true, 'Por favor ingresa el usuario']
    },
    libro: {
        type: Schema.Types.ObjectId,
        ref: 'libro',
        required: [true, 'Por favor ingresa el libro']
    },
    fechaPrestamo: {
        type: String,
        require: [true, 'Ingrese por favor la fecha de prestamo']
    },
    fechaDevolucion: {
        type: String,
        require: [true, 'Ingrese por favor la fecha de devolucion']
    }
});

prestamoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Prestamo', prestamoSchema);