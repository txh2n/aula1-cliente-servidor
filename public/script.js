<<<<<<< HEAD
const tipoUsuario = localStorage.getItem("tipoUsuario");

// se não estiver logado volta para login
if (!tipoUsuario) {
    window.location.href = "login.html";
}

=======
>>>>>>> b9a8ca6b36d28ddc576c23f73d57ee62037b10c9
const form = document.getElementById("formFuncionario");
const lista = document.getElementById("listaFuncionarios");
const API = "http://localhost:3000/funcionarios";

// Listar funcionários
function carregarFuncionarios() {
    fetch(API)
        .then(response => response.json())
        .then(data => {
            lista.innerHTML = "";

            data.forEach(func => {
                const li = document.createElement("li");

                // Texto do funcionário
                const texto = document.createElement("span");
                texto.textContent = `${func.nome} - ${func.cargo} - R$ ${func.salario} - ${func.setor}`;

                // Container para os botões
                const botaoContainer = document.createElement("div");
                botaoContainer.classList.add("botao-container");

                // Botão Editar
                const btnEditar = document.createElement("button");
                btnEditar.textContent = "Editar";
                btnEditar.classList.add("editar");
                btnEditar.addEventListener("click", () => {
                    editarFuncionario(func.id, func.cargo, func.salario);
                });

<<<<<<< HEAD
                botaoContainer.appendChild(btnEditar);

                // Botão Excluir (SÓ ADMIN)
                if (tipoUsuario === "admin") {

                    const btnExcluir = document.createElement("button");
                    btnExcluir.textContent = "Excluir";
                    btnExcluir.classList.add("excluir");

                    btnExcluir.addEventListener("click", () => {
                        excluirFuncionario(func.id);
                    });

                    botaoContainer.appendChild(btnExcluir);
                }
=======
                // Botão Excluir
                const btnExcluir = document.createElement("button");
                btnExcluir.textContent = "Excluir";
                btnExcluir.classList.add("excluir");
                btnExcluir.addEventListener("click", () => {
                    excluirFuncionario(func.id);
                });

                // Adiciona os botões no container
                botaoContainer.appendChild(btnEditar);
                botaoContainer.appendChild(btnExcluir);
>>>>>>> b9a8ca6b36d28ddc576c23f73d57ee62037b10c9

                // Adiciona o texto e os botões no li
                li.appendChild(texto);
                li.appendChild(botaoContainer);

                lista.appendChild(li);
            });
        });
}

// Cadastrar funcionário
form.addEventListener("submit", function(e) {
<<<<<<< HEAD

=======
>>>>>>> b9a8ca6b36d28ddc576c23f73d57ee62037b10c9
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const cargo = document.getElementById("cargo").value;
    const salario = document.getElementById("salario").value;
    const setor = document.getElementById("setor").value;

    fetch(API, {
<<<<<<< HEAD

        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ nome, cargo, salario, setor })

    })
    .then(response => response.json())
    .then(() => {

        form.reset();
        carregarFuncionarios();

=======
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, cargo, salario, setor })
    })
    .then(response => response.json())
    .then(() => {
        form.reset();
        carregarFuncionarios();
>>>>>>> b9a8ca6b36d28ddc576c23f73d57ee62037b10c9
    });
});

// Excluir funcionário
function excluirFuncionario(id) {
<<<<<<< HEAD

    if (confirm("Deseja realmente excluir este funcionário?")) {

        fetch(`${API}/${id}`, { method: "DELETE" })
            .then(() => carregarFuncionarios());

    }

}

// Editar funcionário
function editarFuncionario(id, cargoAtual, salarioAtual) {

=======
    if (confirm("Deseja realmente excluir este funcionário?")) {
        fetch(`${API}/${id}`, { method: "DELETE" })
            .then(() => carregarFuncionarios());
    }
}

// Editar funcionário (cargo e salário)
function editarFuncionario(id, cargoAtual, salarioAtual) {
>>>>>>> b9a8ca6b36d28ddc576c23f73d57ee62037b10c9
    const novoCargo = prompt("Novo cargo:", cargoAtual);
    const novoSalario = prompt("Novo salário:", salarioAtual);

    if (novoCargo && novoSalario) {
<<<<<<< HEAD

        fetch(`${API}/${id}`, {

            method: "PUT",

            headers: { "Content-Type": "application/json" },

            body: JSON.stringify({ cargo: novoCargo, salario: novoSalario })

        })
        .then(() => carregarFuncionarios());

    }

}

// logout
function logout(){

    localStorage.removeItem("tipoUsuario");

    window.location.href = "login.html";

}

// Carregar funcionários
=======
        fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cargo: novoCargo, salario: novoSalario })
        })
        .then(() => carregarFuncionarios());
    }
}

// Carregar funcionários ao abrir a página
>>>>>>> b9a8ca6b36d28ddc576c23f73d57ee62037b10c9
carregarFuncionarios();