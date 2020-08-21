const express = require('express');
const app = express();



app.use(require('./usuario'));
app.use(require('./login'));
app.use(require('./categoria'));
app.use(require('./libro'));
app.use(require('./upload'));
app.use(require('./image'));
app.use(require('./prestamo'));

module.exports = app;