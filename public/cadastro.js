const form = document.getElementById("formCadastro");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    fetch("http://localhost:3000/usuarios",{

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