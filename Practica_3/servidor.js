const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const rutasProductos = require('./rutas/productos');

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/vistas'); // 👈 Asegura que busca en "vistas"

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/', rutasProductos);

app.listen(3000, () => {
    console.log('🚀 Servidor en http://localhost:3000');
});
