require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const alunosRoutes = require("./routes/alunos.routes");
const db = require("./database/database");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Serve favicon
app.get("/favicon.ico", (req, res) => res.sendFile(path.join(__dirname, "public", "favicon.ico")));

// Rota raiz
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

// Rotas de funcionários
app.use("/", alunosRoutes);

// LOGIN
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  const sql = "SELECT * FROM usuarios WHERE email=$1 AND senha=$2";
  try {
    const result = await db.query(sql, [email, senha]);
    if (result.rows.length > 0) res.json({ sucesso: true, tipo: result.rows[0].tipo });
    else res.json({ sucesso: false });
  } catch (err) {
    console.error("Erro no login:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// CADASTRAR USUÁRIO
app.post("/usuarios", async (req, res) => {
  const { nome, email, senha } = req.body;
  const sql = "INSERT INTO usuarios (nome,email,senha,tipo) VALUES ($1,$2,$3,'usuario') RETURNING *";
  try {
    const result = await db.query(sql, [nome, email, senha]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao cadastrar usuário:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Criar tabela funcionarios se não existir
const criarTabelaFuncionarios = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS funcionarios (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      cargo VARCHAR(50) NOT NULL,
      salario NUMERIC NOT NULL,
      setor VARCHAR(50) NOT NULL
    )
  `;
  try { await db.query(sql); console.log("Tabela funcionarios pronta"); } 
  catch (err) { console.error("Erro ao criar tabela funcionarios:", err.message); }
};
criarTabelaFuncionarios();

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));