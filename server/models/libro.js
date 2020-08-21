const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');
const Categoria = require('./categoria');

let Schema = mongoose.Schema;

let libroSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el nombre del libro']
    },
    descripcion: {
        type: String,
        required: [true, 'Por favor ingresa la  descripcion del libro']
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, 'Por favor ingresa la categoria del libro']
    },
    disponible: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,
        required: [false, 'Por favor ingresa la imagen']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Por favor ingresa el usuario']
    }
});

libroSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Libro', libroSchema);