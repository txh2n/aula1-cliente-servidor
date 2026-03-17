const form = document.getElementById("formCadastro");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    fetch("https://aula1-cliente-servidor-nine.vercel.app/usuarios",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({nome,email,senha})

    })
    .then(res=>res.json())
    .then(data=>{

        alert("Usuário cadastrado com sucesso!");

        window.location.href="login.html";

    });

});