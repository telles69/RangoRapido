const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '../../database/rangorapido.db');
const dbDir = path.dirname(dbPath);

// Garantir que o diretório do banco existe
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados:', err);
  } else {
    console.log('✓ Conectado ao SQLite');
  }
});

// Executar migrations
const initializeDatabase = () => {
  db.serialize(() => {
    // Tabela de Usuários
    db.run(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha_hash TEXT NOT NULL,
        telefone TEXT,
        endereco_principal TEXT,
        tipo_usuario TEXT CHECK(tipo_usuario IN ('cliente', 'restaurante')) DEFAULT 'cliente',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabela de Restaurantes
    db.run(`
      CREATE TABLE IF NOT EXISTS restaurantes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER UNIQUE NOT NULL,
        nome_fantasia TEXT NOT NULL,
        cnpj TEXT UNIQUE NOT NULL,
        endereco TEXT NOT NULL,
        categoria_principal TEXT NOT NULL,
        descricao TEXT,
        ativo BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
      )
    `);

    // Tabela de Produtos
    db.run(`
      CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        restaurante_id INTEGER NOT NULL,
        nome TEXT NOT NULL,
        descricao TEXT,
        preco DECIMAL(10, 2) NOT NULL,
        imagem_url TEXT,
        ativo BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id)
      )
    `);

    // Tabela de Pedidos
    db.run(`
      CREATE TABLE IF NOT EXISTS pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        restaurante_id INTEGER NOT NULL,
        status TEXT CHECK(status IN ('Pendente', 'Preparando', 'Saiu para Entrega', 'Entregue')) DEFAULT 'Pendente',
        valor_total DECIMAL(10, 2) NOT NULL,
        data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
        FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id)
      )
    `);

    // Tabela de Itens do Pedido
    db.run(`
      CREATE TABLE IF NOT EXISTS itens_pedido (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pedido_id INTEGER NOT NULL,
        produto_id INTEGER NOT NULL,
        quantidade INTEGER NOT NULL,
        preco_unitario DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
        FOREIGN KEY (produto_id) REFERENCES produtos(id)
      )
    `);

    console.log('✓ Database tables initialized');
  });
};

module.exports = {
  db,
  initializeDatabase,
  run: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  },
  get: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
  all: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
};
