const tipoUsuario = localStorage.getItem("tipoUsuario");

const form = document.getElementById("formFuncionario");
const lista = document.getElementById("listaFuncionarios");
const API = "http://localhost:3000/funcionarios";

// Se não estiver logado volta para login
if (!tipoUsuario) {
    window.location.href = "login.html";
} else {
    carregarFuncionarios();
}

// ----------------------------
// Listar funcionários
// ----------------------------
async function carregarFuncionarios() {
    try {
        const response = await fetch(API);
        if (!response.ok) throw new Error("Erro ao acessar API");

        const data = await response.json();

        console.log(data); // Para depuração

        lista.innerHTML = "";

        if (!Array.isArray(data) || data.length === 0) {
            lista.innerHTML = "<li>Nenhum funcionário encontrado</li>";
            return;
        }

        data.forEach(func => {
            const li = document.createElement("li");

            // Texto do funcionário
            const texto = document.createElement("span");
            texto.textContent = `${func.nome} - ${func.cargo} - R$ ${func.salario} - ${func.setor}`;

            // Container dos botões
            const botaoContainer = document.createElement("div");
            botaoContainer.classList.add("botao-container");

            // Botão editar
            const btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            btnEditar.classList.add("editar");

            btnEditar.addEventListener("click", () => {
                editarFuncionario(func.id, func.cargo, func.salario);
            });

            botaoContainer.appendChild(btnEditar);

            // Botão excluir (apenas admin)
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

    } catch (err) {
        console.error("Erro ao carregar funcionários:", err);
        lista.innerHTML = "<li>Erro ao carregar funcionários</li>";
    }
}

// ----------------------------
// Cadastrar funcionário
// ----------------------------
form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const cargo = document.getElementById("cargo").value.trim();
    const salario = Number(document.getElementById("salario").value);
    const setor = document.getElementById("setor").value.trim();

    if (!nome || !cargo || !setor || isNaN(salario)) {
        alert("Todos os campos são obrigatórios e o salário deve ser um número válido!");
        return;
    }

    try {
        const response = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, cargo, salario, setor })
        });

        if (!response.ok) throw new Error("Erro ao cadastrar funcionário");

        const data = await response.json();
        console.log("Funcionário cadastrado:", data);

        form.reset();
        carregarFuncionarios();

    } catch (err) {
        console.error("Erro ao cadastrar funcionário:", err);
        alert("Erro ao cadastrar funcionário");
    }
});

// ----------------------------
// Excluir funcionário
// ----------------------------
async function excluirFuncionario(id) {
    if (!confirm("Deseja realmente excluir este funcionário?")) return;

    try {
        const response = await fetch(`${API}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Erro ao excluir funcionário");

        carregarFuncionarios();

    } catch (err) {
        console.error("Erro ao excluir funcionário:", err);
        alert("Erro ao excluir funcionário");
    }
}

// ----------------------------
// Editar funcionário
// ----------------------------
async function editarFuncionario(id, cargoAtual, salarioAtual) {
    const novoCargo = prompt("Novo cargo:", cargoAtual);
    const novoSalario = prompt("Novo salário:", salarioAtual);

    if (!novoCargo || !novoSalario) return;

    const salarioNum = Number(novoSalario);
    if (isNaN(salarioNum)) {
        alert("Salário inválido!");
        return;
    }

    try {
        const response = await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cargo: novoCargo, salario: salarioNum })
        });

        if (!response.ok) throw new Error("Erro ao atualizar funcionário");

        carregarFuncionarios();

    } catch (err) {
        console.error("Erro ao atualizar funcionário:", err);
        alert("Erro ao atualizar funcionário");
    }
}

// ----------------------------
// Logout
// ----------------------------
function logout() {
    localStorage.removeItem("tipoUsuario");
    window.location.href = "login.html";
}