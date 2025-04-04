const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',      // Servidor de la base de datos
    user: 'root',           // Usuario de MySQL (cambia si tienes otro)
    password: '',           // Contraseña (déjala vacía si no usaste una)
    database: 'tienda'      // Nombre de la base de datos
});

conexion.connect((error) => {
    if (error) {
        console.error('Error de conexión a la base de datos:', error);
        return;
    }
    console.log('✅ Conectado a la base de datos MySQL');
});

module.exports = conexion;
