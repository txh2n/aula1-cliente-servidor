const form=document.getElementById("formLogin");

form.addEventListener("submit",function(e){

e.preventDefault();

const email=document.getElementById("email").value;
const senha=document.getElementById("senha").value;

fetch("http://localhost:3000/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({email,senha})

})

.then(res=>res.json())
.then(data=>{

if(data.sucesso){

localStorage.setItem("tipoUsuario",data.tipo);

window.location.href="index.html";

}else{

alert("Email ou senha inválidos");

}

});

});