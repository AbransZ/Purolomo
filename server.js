import sql from "sqlite3";
import path from "path";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { error } from "console";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

const dbPath = path.resolve(__dirname, "historial.db");
console.log("Intentando conectar a:", dbPath);

const db = new sql.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Error al conectar a la base de datos:", err.message);
  } else {
    console.log(
      "✅ Conexión a la base de datos establecida correctamente:",
      dbPath
    );

    // Crear tabla aplicacion
    db.run(
      `CREATE TABLE IF NOT EXISTS aplicacion (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            nombre_app TEXT UNIQUE, 
            autor TEXT 
        )`,
      (errApp) => {
        if (errApp) {
          console.error("❌ Error tabla aplicacion:", errApp.message);
        } else {
          console.log("👍 Tabla 'aplicacion' OK.");

          // Crear tabla registro_version DENTRO del callback de la primera
          db.run(
            `CREATE TABLE IF NOT EXISTS registro_version (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    version TEXT, 
                    descripcion TEXT, 
                    hash_git TEXT, 
                    fecha TEXT, 
                    active INTEGER,
                    id_app INTEGER, 
                    FOREIGN KEY(id_app) REFERENCES aplicacion(id) 
                )`,
            (errReg) => {
              if (errReg) {
                console.error(
                  "❌ Error tabla registro_version:",
                  errReg.message
                );
              } else {
                console.log("👍 Tabla 'registro_version' OK.");
              }
            }
          );
        }
      }
    );
  }
});

app.get("/api/registros", (req, res) => {
  console.log("➡️ Petición GET a /api/registros recibida.");
  const sqlQuery = `
      SELECT 
        rv.id, rv.version, rv.descripcion, rv.hash_git, rv.fecha, 
        a.nombre_app as nombre ,a.autor
      FROM 
        registro_version rv 
      LEFT JOIN 
        aplicacion a ON rv.id_app = a.id 
        WHERE rv.active = 1
      ORDER BY 
        rv.fecha DESC, rv.id DESC`;

  console.log("📄 Ejecutando SQL:", sqlQuery);

  db.all(sqlQuery, [], (err, rows) => {
    if (err) {
      console.error("❌ Error durante la consulta:", err.message);
      res.status(500).json({ error: err.message });
      return;
    }

    console.log("🔍 Filas encontradas:", rows);
    // console.log(`✅ ${rows.length} registros obtenidos.`);
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.post("/api/registros", (req, res) => {
  console.log("post realizado: ", req.body);

  // 1. Extrae los datos del cuerpo
  const { nombre, version, autor, hash, descripcion, fecha } = req.body;

  // Validación (sin cambios)
  if (!nombre || !version || !autor || !hash || !descripcion || !fecha) {
    return res.status(400).json({ error: "Faltan datos requeridos." });
  }

  const findAppSql = `SELECT id FROM aplicacion WHERE nombre_app = ?`;

  db.get(findAppSql, [nombre], (errApp, appRow) => {
    if (errApp) {
      console.log("Error al conseguir app", errApp.message);
    }
    let appId;
    if (appRow) {
      // 2.A. Si la aplicación existe, usa su ID
      appId = appRow.id;
      console.log(`ℹ️ Aplicación '${nombre}' encontrada con ID: ${appId}`);
      insertRegistro(appId); // Llama a la función para insertar el registro
    } else {
      // 2.B. Si la aplicación NO existe, la creamos primero
      console.log(`ℹ️ Aplicación '${nombre}' no encontrada, creando...`);
      const insertAppSql = `INSERT INTO aplicacion (nombre_app, autor) VALUES (?, ?)`;
      // Usamos el 'autor' del registro como autor de la app (puedes cambiarlo si quieres)
      db.run(insertAppSql, [nombre, autor], function (errInsertApp) {
        if (errInsertApp) {
          console.error("❌ Error creando app:", errInsertApp.message);
          return res
            .status(500)
            .json({ error: "Error interno al crear aplicación." });
        }
        // 'this.lastID' nos da el ID de la fila recién insertada
        appId = this.lastID;
        console.log(`✅ Aplicación '${nombre}' creada con ID: ${appId}`);
        insertRegistro(appId); // Llama a la función para insertar el registro
      });
    }
  });

  function insertRegistro(id_app) {
    const insertRegSql = `INSERT INTO registro_version 
          (version, descripcion, hash_git, fecha,active, id_app) 
          VALUES (?, ?, ?, ?, 1,?)`;
    // Asegúrate que el orden coincida con los '?'
    const params = [version, descripcion, hash, fecha, id_app];

    db.run(insertRegSql, params, function (errInsertReg) {
      if (errInsertReg) {
        console.error("❌ Error insertando registro:", errInsertReg.message);
        return res.status(500).json({ error: "Error al guardar el registro." });
      }
      const registroId = this.lastID;
      console.log(
        `✅ Nuevo registro insertado con ID: ${registroId} para App ID: ${id_app}`
      );

      // 4. Preparamos la respuesta para el frontend
      //    Incluimos el ID generado y los datos originales
      const newRecordResponse = {
        id: registroId,
        nombre: nombre, // Nombre app
        version: version,
        autor: autor, // Autor registro
        hash_git: hash, // Asegúrate que coincida con tu tabla
        descripcion: descripcion,
        fecha: fecha,
        id_app: id_app, // Opcional devolverlo
      };
      // Enviamos respuesta 201 (Created) con el registro creado
      res.status(201).json(newRecordResponse);
    });
  }
});

app.patch("/api/registros/:id/disable", (req, res) => {
  const { id } = req.params;
  console.log(`➡️ Petición PATCH recibida para inhabilitar registro ID: ${id}`);

  const sql = "update registro_version set active = 0 where id = ?";
  const params = [id];

  db.run(sql, params, function (err) {
    if (err) {
      console.error("Error al ejectuar inhabilitacion", err.message);
      return res.status(500).json({ error: "Error interno al inhabilitar" });
    }
    if (this.changes === 0) {
      console.log(`registro con id ${id} no encontrado`);
      return res.status(500).json({ error: "Registro no encontrado" });
    }
    console.log(`registro con id : ${id} inhabilitado correctamente`);
    res.status(200).json({ message: `registro id:${id} Eliminado` });
  });
});

app.put("/api/registros/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, version, autor, descripcion, hash_git, fecha } = req.body;
  console.log(`➡️ Petición put recibida para actualizar registro ID: ${id}`);

  if (!nombre || !version || !autor || !hash_git || !descripcion || !fecha) {
    return res.status(400).json({ error: "Faltan datos requeridos." });
  }

  const getAppIdSql = "SELECT id_app FROM registro_version WHERE id = ?";
  db.get(getAppIdSql, [id], (errGet, row) => {
    if (errGet) {
      console.error("❌ Error obteniendo id_app:", errGet.message);
      return res
        .status(500)
        .json({ error: "Error interno al buscar registro." });
    }
    if (!row) {
      return res
        .status(404)
        .json({ error: "Registro no encontrado para obtener id_app." });
    }

    const currentAppId = row.id_app;
    console.log(
      `ℹ️ ID de aplicación actual para registro ${id} es: ${currentAppId}`
    );

    const updateApp =
      "update aplicacion set nombre_app =? ,autor=? where id =?";
    db.run(updateApp, [nombre, autor, currentAppId], function (err) {
      if (err) {
        console.error("❌ Error al actualizar aplicación:", err.message);
        return res
          .status(500)
          .json({ error: "Error interno al actualizar datos de aplicación." });
      }
      console.log(
        `✅ Aplicación ID ${currentAppId} actualizada (si existía). Cambios: ${this.changes}`
      );
      const sql =
        "update registro_version set version = ?,descripcion = ?, hash_git = ?, fecha = ? where id = ?";
      const params = [version, descripcion, hash_git, fecha, id];
      db.run(sql, params, function (err) {
        if (err) {
          console.error("❌ Error al actualizar registro:", err.message);
          return res.status(500).json({
            error: "Error interno al actualizar detalles del registro.",
          });
        }
        console.log(`✅ Registro con ID ${id} actualizado correctamente.`);
        const updatedRecord = {
          id: parseInt(id),
          nombre,
          version,
          autor,
          hash_git,
          descripcion,
          fecha,
          id_app: currentAppId,
        };
        console.log(
          `✅ Registro nuevo ${id}, ${nombre}, ${version}, ${autor}, ${hash_git}, ${descripcion}, ${fecha}`
        );
        res.status(200).json(updatedRecord);
      });
    });
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor escuchando en http://0.0.0.0:${port}`);
});

process.on("SIGINT", () => {
  db.close((err) => {
    if (err) console.error("Error cerrando BD:", err.message);
    else console.log("🔌 Conexión a la base de datos cerrada.");
    process.exit(0);
  });
});
