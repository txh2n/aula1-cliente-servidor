const db = require("../database/database");

// Listar
exports.listar = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM funcionarios ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao listar funcionários:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Cadastrar
exports.cadastrar = async (req, res) => {
  const { nome, cargo, salario, setor } = req.body;

  if (!nome || !cargo || !salario || !setor) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const salarioNumber = Number(salario);
  if (isNaN(salarioNumber)) {
    return res.status(400).json({ error: "Salário deve ser um número" });
  }

  try {
    const sql = "INSERT INTO funcionarios (nome, cargo, salario, setor) VALUES ($1,$2,$3,$4) RETURNING *";
    const result = await db.query(sql, [nome, cargo, salarioNumber, setor]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao cadastrar funcionário:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Atualizar
exports.atualizar = async (req, res) => {
  const { id } = req.params;
  const { cargo, salario } = req.body;

  if (!cargo || !salario) {
    return res.status(400).json({ error: "Cargo e salário obrigatórios" });
  }

  const salarioNumber = Number(salario);
  if (isNaN(salarioNumber)) {
    return res.status(400).json({ error: "Salário deve ser um número" });
  }

  try {
    const sql = "UPDATE funcionarios SET cargo=$1, salario=$2 WHERE id=$3 RETURNING *";
    const result = await db.query(sql, [cargo, salarioNumber, id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Funcionário não encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao atualizar funcionário:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Excluir
exports.excluir = async (req, res) => {
  const { id } = req.params;
  try {
    const sql = "DELETE FROM funcionarios WHERE id=$1 RETURNING *";
    const result = await db.query(sql, [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Funcionário não encontrado" });
    res.json({ mensagem: "Funcionário excluído com sucesso!" });
  } catch (err) {
    console.error("Erro ao excluir funcionário:", err.message);
    res.status(500).json({ error: err.message });
  }
};