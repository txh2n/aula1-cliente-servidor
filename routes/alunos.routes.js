const express = require("express");
const router = express.Router();
const alunosController = require("../controllers/alunosController");

// Rotas de funcionários
router.get("/funcionarios", alunosController.listar);
router.post("/funcionarios", alunosController.cadastrar);
router.put("/funcionarios/:id", alunosController.atualizar);
router.delete("/funcionarios/:id", alunosController.excluir);

module.exports = router;