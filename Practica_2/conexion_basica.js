const mysql = require('mysql2');

console.log('🔹 Iniciando conexión básica...');
console.time('⏱️ Tiempo total (Conexión Básica)');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mi_base_de_datos'
});

connection.connect(err => {
  if (err) {
    console.error('❌ Error de conexión:', err.message);
    return;
  }
  console.log('✅ Conectado a MySQL');

  // 🔹 Obtiene usuarios
  connection.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('❌ Error en la consulta:', err);
    } else {
      console.log('📋 Usuarios:', results);
    }
  });

  // 🔹 Inserta usuario
  function insertarUsuario(nombre, apellido, email, edad, telefono) {
    connection.query(
      'INSERT INTO usuarios (nombre, apellido, email, edad, telefono) VALUES (?, ?, ?, ?, ?)',
      [nombre, apellido, email, edad, telefono],
      (err, result) => {
        if (err) return console.error('❌ Error al insertar usuario:', err.message);
        console.log(`✅ Usuario insertado con ID: ${result.insertId}`);
      }
    );
  }

  // 🔹 Buscar usuario por ID
  function buscarUsuarioPorId(id) {
    connection.query(
      'SELECT * FROM usuarios WHERE id = ?',
      [id],
      (err, results) => {
        if (err) return console.error('❌ Error en la consulta:', err.message);
        console.log(results.length ? '✅ Usuario encontrado:' : '⚠️ No encontrado', results[0]);
      }
    );
  }

  // 🔹 Actualiza usuario
  function actualizarUsuario(id, nuevoTelefono) {
    connection.query(
      'UPDATE usuarios SET telefono = ? WHERE id = ?',
      [nuevoTelefono, id],
      (err, result) => {
        if (err) return console.error('❌ Error al actualizar:', err.message);
        console.log(result.affectedRows ? '✅ Usuario actualizado' : '⚠️ No encontrado.');
      }
    );
  }

  // 🔹 Ejecuta ejemplos
  insertarUsuario('Jose', 'Juan', 'Juan@gmail.com', 50, '123425155');
  buscarUsuarioPorId(1);
  actualizarUsuario(1, '987654321');

  // 🔹 Cierra conexión despues de un tiempo
  setTimeout(() => {
    connection.end();
    console.log('🔹 Conexión cerrada.');
    console.timeEnd('⏱️ Tiempo total (Conexión Básica)');
  }, 3000);
});
