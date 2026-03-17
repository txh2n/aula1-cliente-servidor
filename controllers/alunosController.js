const db = require("../database/database");

// ----------------------------
// LISTAR FUNCIONÁRIOS
// ----------------------------
exports.listar = async (req, res) => {
    const sql = "SELECT * FROM funcionarios ORDER BY id ASC";

    try {
        const result = await db.query(sql);
        res.json(result.rows); // retorna sempre um array
    } catch (err) {
        console.error("Erro ao listar funcionários:", err);
        res.status(500).json({ error: "Erro ao listar funcionários" });
    }
};

// ----------------------------
// CADASTRAR FUNCIONÁRIO
// ----------------------------
exports.cadastrar = async (req, res) => {
    const { nome, cargo, salario, setor } = req.body;

    // RETURNING * retorna o registro criado
    const sql = "INSERT INTO funcionarios (nome, cargo, salario, setor) VALUES ($1,$2,$3,$4) RETURNING *";

    try {
        const result = await db.query(sql, [nome, cargo, salario, setor]);
        res.json(result.rows[0]); // retorna o funcionário criado
    } catch (err) {
        console.error("Erro ao cadastrar funcionário:", err);
        res.status(500).json({ error: "Erro ao cadastrar funcionário" });
    }
};

// ----------------------------
// ATUALIZAR FUNCIONÁRIO
// ----------------------------
exports.atualizar = async (req, res) => {
    const { id } = req.params;
    const { cargo, salario } = req.body;

    // RETURNING * retorna o registro atualizado
    const sql = "UPDATE funcionarios SET cargo=$1, salario=$2 WHERE id=$3 RETURNING *";

    try {
        const result = await db.query(sql, [cargo, salario, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Funcionário não encontrado" });
        }
        res.json(result.rows[0]); // retorna o funcionário atualizado
    } catch (err) {
        console.error("Erro ao atualizar funcionário:", err);
        res.status(500).json({ error: "Erro ao atualizar funcionário" });
    }
};

// ----------------------------
// EXCLUIR FUNCIONÁRIO
// ----------------------------
exports.excluir = async (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM funcionarios WHERE id=$1 RETURNING *";

    try {
        const result = await db.query(sql, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Funcionário não encontrado" });
        }
        res.json({ mensagem: "Funcionário excluído com sucesso!" });
    } catch (err) {
        console.error("Erro ao excluir funcionário:", err);
        res.status(500).json({ error: "Erro ao excluir funcionário" });
    }
};