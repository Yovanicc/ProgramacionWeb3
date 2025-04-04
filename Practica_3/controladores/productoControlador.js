const Producto = require('../modelos/Producto');

// Listar productos
exports.listarProductos = (req, res) => {
    Producto.obtenerTodos((err, resultados) => {
        if (err) throw err;
        res.render('index', { productos: resultados });
    });
};

// Guardar producto
exports.guardarProducto = (req, res) => {
    const { nombre, precio, stock, categoria, proveedor } = req.body;
    const nuevoProducto = { nombre, precio, stock, categoria, proveedor };
    Producto.insertar(nuevoProducto, (err) => {
        if (err) throw err;
        res.redirect('/');
    });
};

// Editar producto
exports.editarProducto = (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;
    console.log("Datos recibidos para actualizar:", datosActualizados);  // Para depuración
    Producto.actualizar(id, datosActualizados, (err) => {
        if (err) throw err;
        res.redirect('/');
    });
};

// Eliminar producto
exports.eliminarProducto = (req, res) => {
    const { id } = req.params;
    Producto.eliminar(id, (err) => {
        if (err) throw err;
        res.redirect('/');
    });
};
