require("dotenv").config();

const express = require("express");
const cors = require("cors");

const alunosRoutes = require("./routes/alunos.routes");
const db = require("./database/database");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/", alunosRoutes);


/* LOGIN */

app.post("/login", async (req,res)=>{

const {email,senha} = req.body;

const sql = "SELECT * FROM usuarios WHERE email=$1 AND senha=$2";

try{

const result = await db.query(sql,[email,senha]);

if(result.rows.length > 0){

res.json({
sucesso:true,
tipo:result.rows[0].tipo
});

}else{

res.json({sucesso:false});

}

}catch(err){

console.log(err);
res.status(500).json(err);

}

});


/* CADASTRAR USUARIO */

app.post("/usuarios", async (req,res)=>{

const {nome,email,senha} = req.body;

const tipo = "usuario";

const sql = "INSERT INTO usuarios (nome,email,senha,tipo) VALUES ($1,$2,$3,$4)";

try{

await db.query(sql,[nome,email,senha,tipo]);

res.json({
mensagem:"Usuário cadastrado com sucesso!"
});

}catch(err){

console.log(err);
res.status(500).json(err);

}

});


app.listen(3000,()=>{

console.log("Servidor rodando na porta 3000");

});