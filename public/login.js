const form = document.getElementById("formLogin");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    console.log(email, senha); // TESTE

    fetch("https://aula1-cliente-servidor-nine.vercel.app/login", {
    method: "POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({email, senha})
})

    .then(res => res.json())
    .then(data => {

        console.log(data); // TESTE

        if(data.sucesso){

            localStorage.setItem("tipoUsuario", data.tipo);

            window.location.href = "index.html";

        }else{

            alert("Email ou senha inválidos");

        }

    });

});