const express = require("express");
const cors = require("cors");

const alunosRoutes = require("./routes/alunos.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/", alunosRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});