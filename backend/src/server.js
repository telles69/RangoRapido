require('dotenv').config();
const app = require('./app');
const { initializeDatabase } = require('./config/database');

const PORT = process.env.PORT || 3000;

// Inicializar banco de dados
initializeDatabase();

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✓ Servidor rodando na porta ${PORT}`);
});
