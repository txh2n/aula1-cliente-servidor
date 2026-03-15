const express = require("express");
const cors = require("cors");

const alunosRoutes = require("./routes/alunos.routes");
<<<<<<< HEAD
const db = require("./database/database");
=======
>>>>>>> b9a8ca6b36d28ddc576c23f73d57ee62037b10c9

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/", alunosRoutes);

<<<<<<< HEAD
/* LOGIN */

app.post("/login",(req,res)=>{

const {email,senha}=req.body;

const sql="SELECT * FROM usuarios WHERE email=? AND senha=?";

db.query(sql,[email,senha],(err,result)=>{

if(err){
res.status(500).json(err);
return;
}

if(result.length>0){

res.json({
sucesso:true,
tipo:result[0].tipo
});

}else{

res.json({sucesso:false});

}

});

});

/* CADASTRAR USUARIO */

app.post("/usuarios", (req, res) => {

    const { nome, email, senha } = req.body;

    const tipo = "usuario"; // todo usuário cadastrado será comum

    const sql = "INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)";

    db.query(sql, [nome, email, senha, tipo], (err, result) => {

        if (err) {
            console.log(err);
            res.status(500).json(err);
            return;
        }

        res.json({
            mensagem: "Usuário cadastrado com sucesso!"
        });

    });

});

app.listen(3000,()=>{

console.log("Servidor rodando na porta 3000");

=======
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
>>>>>>> b9a8ca6b36d28ddc576c23f73d57ee62037b10c9
});