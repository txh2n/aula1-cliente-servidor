const tipoUsuario = localStorage.getItem("tipoUsuario");

const form = document.getElementById("formFuncionario");
const lista = document.getElementById("listaFuncionarios");

// URL da API hospedada no Vercel
const API = "https://aula1-cliente-servidor-nine.vercel.app/funcionarios";

// Redireciona para login se não estiver logado
if (!tipoUsuario) {
    window.location.href = "login.html";
} else {
    carregarFuncionarios();
}

// ----------------------------
// Listar funcionários
// ----------------------------
function carregarFuncionarios() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            lista.innerHTML = "";

            if (!Array.isArray(data)) {
                console.error("API não retornou lista:", data);
                return;
            }

            data.forEach(func => {
                const li = document.createElement("li");

                const texto = document.createElement("span");
                texto.textContent = `${func.nome} - ${func.cargo} - R$ ${func.salario} - ${func.setor}`;

                const botaoContainer = document.createElement("div");
                botaoContainer.classList.add("botao-container");

                const btnEditar = document.createElement("button");
                btnEditar.textContent = "Editar";
                btnEditar.classList.add("editar");
                btnEditar.addEventListener("click", () => {
                    editarFuncionario(func.id, func.cargo, func.salario);
                });
                botaoContainer.appendChild(btnEditar);

                if (tipoUsuario === "admin") {
                    const btnExcluir = document.createElement("button");
                    btnExcluir.textContent = "Excluir";
                    btnExcluir.classList.add("excluir");
                    btnExcluir.addEventListener("click", () => {
                        excluirFuncionario(func.id);
                    });
                    botaoContainer.appendChild(btnExcluir);
                }

                li.appendChild(texto);
                li.appendChild(botaoContainer);
                lista.appendChild(li);
            });
        })
        .catch(err => console.error(err));
}

// ----------------------------
// Cadastrar funcionário
// ----------------------------
form.addEventListener("submit", function(e){
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const cargo = document.getElementById("cargo").value.trim();
    const salario = parseFloat(document.getElementById("salario").value);
    const setor = document.getElementById("setor").value.trim();

    // Validação simples
    if (!nome || !cargo || !salario || !setor) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    fetch(API,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({nome, cargo, salario, setor})
    })
    .then(res => res.json())
    .then(data => {
        form.reset();
        carregarFuncionarios();
    })
    .catch(err => console.error("Erro ao cadastrar funcionário:", err));
});

// ----------------------------
// Excluir funcionário
// ----------------------------
function excluirFuncionario(id){
    if(confirm("Deseja realmente excluir este funcionário?")){
        fetch(`${API}/${id}`,{ method:"DELETE" })
            .then(() => carregarFuncionarios());
    }
}

// ----------------------------
// Editar funcionário
// ----------------------------
function editarFuncionario(id, cargoAtual, salarioAtual){
    const novoCargo = prompt("Novo cargo:", cargoAtual);
    const novoSalario = parseFloat(prompt("Novo salário:", salarioAtual));

    if (!novoCargo || !novoSalario) {
        alert("Cargo e salário válidos são obrigatórios!");
        return;
    }

    fetch(`${API}/${id}`,{
        method:"PUT",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ cargo: novoCargo, salario: novoSalario })
    })
    .then(() => carregarFuncionarios())
    .catch(err => console.error("Erro ao atualizar funcionário:", err));
}

// ----------------------------
// Logout
// ----------------------------
function logout(){
    localStorage.removeItem("tipoUsuario");
    window.location.href="login.html";
}