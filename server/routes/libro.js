const express = require('express');
const _ = require('underscore');
const app = express();
const Libro = require('../models/libro');


//get 

app.get('/libro', function(req, res) {
    Libro.find({ disponible: true })
        .exec((err, libros) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: `Ocurrio un error al momento de consultar ${err}`
                });
            }
            return res.json({
                ok: true,
                mensaje: 'Consulta realizada con exito',
                count: libros.length,
                libros
            });
        });
});

//post Agregar nuevos productps 

app.post('/libro', function(req, res) {
    let body = req.body;

    let libro = new Libro({
        nombre: body.nombre,
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: body.usuario

    });

    libro.save((err, lbrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de guardar ${err}`
            });
        }
        res.json({
            ok: true,
            mensaje: 'El libro ha sido insertado con exito',
            libro: lbrDB
        })

    });

});

//put

app.put('/libro/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'categoria', 'disponible', 'usuario']);

    Libro.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, lbrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de actualizar ${err}`
            });
        }
        return res.json({
            ok: true,
            mensaje: 'Cambios guardados con exito',
            libro: lbrDB
        });
    });
});

//delete

app.delete('/libro/:id', function(req, res) {
    let id = req.params.id;
    // Usuario.deleteOne({ _id: id }, (err, resp) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }
    //     if (resp.deletedCount === 0) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 id,
    //                 msg: 'Usuario no encontrado'
    //             }
    //         });
    //     }
    //     return res.status(200).json({
    //         ok: true,
    //         resp
    //     });

    // });
    Libro.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de eliminar un  ${err}`
            });
        }
        return res.json({
            ok: true,
            mensaje: 'Libro borrado con exito',
            resp
        });
    });
});

module.exports = app;