const db = require("../database/database");

// LISTAR FUNCIONARIOS
exports.listar = (req, res) => {

    const sql = "SELECT * FROM funcionarios";

    db.query(sql, (err, result) => {

        if(err){
            console.log(err);
            res.status(500).json(err);
            return;
        }

        res.json(result);

    });

};


// CADASTRAR FUNCIONRIO
exports.cadastrar = (req, res) => {

    const { nome, cargo, salario, setor } = req.body;

    const sql = "INSERT INTO funcionarios (nome, cargo, salario, setor) VALUES (?, ?, ?, ?)";

    db.query(sql, [nome, cargo, salario, setor], (err, result) => {

        if(err){
            console.log(err);
            res.status(500).json(err);
            return;
        }

        res.json({
            mensagem: "Funcionário cadastrado com sucesso!"
        });

    });

};

// ATUALIZAR FUNCIONÁRIO
exports.atualizar = (req, res) => {
    const { id } = req.params;
    const { cargo, salario } = req.body;

    const sql = "UPDATE funcionarios SET cargo = ?, salario = ? WHERE id = ?";

    db.query(sql, [cargo, salario, id], (err, result) => {
        if(err){
            console.log(err);
            res.status(500).json(err);
            return;
        }
        res.json({ mensagem: "Funcionário atualizado com sucesso!" });
    });
};

// EXCLUIR FUNCIONÁRIO
exports.excluir = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM funcionarios WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if(err){
            console.log(err);
            res.status(500).json(err);
            return;
        }
        res.json({ mensagem: "Funcionário excluído com sucesso!" });
    });
};