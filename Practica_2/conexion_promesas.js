const mysql = require('mysql2/promise');

async function main() {
  console.log('🔹 Iniciando conexión con promesas...');
  console.time('⏱️ Tiempo total (Conexión con Promesas)');

  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'mi_base_de_datos',
    });

    console.log('✅ Conectado a MySQL');

    // 🔹 Obtiene usuarios
    const [rows] = await connection.execute('SELECT * FROM usuarios');
    console.log('📋 Usuarios:', rows);

    // 🔹 Inserta usuario
    async function insertarUsuario(nombre, apellido, email, edad, telefono) {
      const [result] = await connection.execute(
        'INSERT INTO usuarios (nombre, apellido, email, edad, telefono) VALUES (?, ?, ?, ?, ?)',
        [nombre, apellido, email, edad, telefono]
      );
      console.log(`✅ Usuario insertado con ID: ${result.insertId}`);
    }

    // 🔹 Busca usuario por ID
    async function buscarUsuarioPorId(id) {
      const [rows] = await connection.execute(
        'SELECT * FROM usuarios WHERE id = ?',
        [id]
      );
      console.log(rows.length ? '✅ Usuario encontrado:' : '⚠️ No encontrado', rows[0]);
    }

    // 🔹 Actualiza usuario
    async function actualizarUsuario(id, nuevoTelefono) {
      const [result] = await connection.execute(
        'UPDATE usuarios SET telefono = ? WHERE id = ?',
        [nuevoTelefono, id]
      );
      console.log(result.affectedRows ? '✅ Usuario actualizado' : '⚠️ No encontrado.');
    }

    // 🔹 Ejecuta ejemplos
    await insertarUsuario('Maria', 'Gomez', 'maria@gmail.com', 28, '555123456');
    await buscarUsuarioPorId(1);
    await actualizarUsuario(1, '777888999');

    await connection.end();
    console.log('🔹 Conexión cerrada.');
  } catch (err) {
    console.error('❌ Error de conexión:', err.message);
  }

  console.timeEnd('⏱️ Tiempo total (Conexión con Promesas)');
}

main();
