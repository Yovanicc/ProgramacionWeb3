const bd = require('../configuracion/bd');

class Producto {
    static obtenerTodos(callback) {
        bd.query('SELECT * FROM productos', callback);
    }

    static insertar(datos, callback) {
        bd.query('INSERT INTO productos SET ?', datos, callback);
    }

    static actualizar(id, datos, callback) {
        bd.query('UPDATE productos SET ? WHERE id = ?', [datos, id], callback);
    }

    static eliminar(id, callback) {
        bd.query('DELETE FROM productos WHERE id = ?', [id], callback);
    }
}

module.exports = Producto;
