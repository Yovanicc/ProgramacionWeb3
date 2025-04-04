const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mi_base_de_datos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// obrtiene ususario

async function obtenerUsuarios() {
  console.log('🔹 Obteniendo usuarios...');
  console.time('⏱️ Tiempo total (Conexión con Pooling)');
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM usuarios');
    console.log('📋 Usuarios:', rows);
  } catch (err) {
    console.error('❌ Error al obtener usuarios:', err.message);
  } finally {
    if (connection) connection.release();
    console.log('🔹 Conexión liberada.');
    console.timeEnd('⏱️ Tiempo total (Conexión con Pooling)');
  }
}

// 🔹 Inserta usuario
async function insertarUsuario(nombre, apellido, email, edad, telefono) {
  const connection = await pool.getConnection();
  const [result] = await connection.execute(
    'INSERT INTO usuarios (nombre, apellido, email, edad, telefono) VALUES (?, ?, ?, ?, ?)',
    [nombre, apellido, email, edad, telefono]
  );
  connection.release();
  console.log(`✅ Usuario insertado con ID: ${result.insertId}`);
}

// 🔹 Busca usuario por ID
async function buscarUsuarioPorId(id) {
  const connection = await pool.getConnection();
  const [rows] = await connection.execute(
    'SELECT * FROM usuarios WHERE id = ?',
    [id]
  );
  connection.release();
  console.log(rows.length ? '✅ Usuario encontrado:' : '⚠️ No encontrado', rows[0]);
}

// 🔹 Actualiza usuario
async function actualizarUsuario(id, nuevoTelefono) {
  const connection = await pool.getConnection();
  const [result] = await connection.execute(
    'UPDATE usuarios SET telefono = ? WHERE id = ?',
    [nuevoTelefono, id]
  );
  connection.release();
  console.log(result.affectedRows ? '✅ Usuario actualizado' : '⚠️ No encontrado.');
}

// 🔹 Ejecuta ejemplos
(async () => {
  await obtenerUsuarios();
  await insertarUsuario('Luis', 'Martinez', 'luis@gmail.com', 35, '333666999');
  await buscarUsuarioPorId(1);
  await actualizarUsuario(1, '222111000');
})();
