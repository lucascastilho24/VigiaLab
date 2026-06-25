//Botão Modal
const modal = document.getElementById('modalAgendamento');

function abrirModal() {
    modal.style.display = 'flex';
}

function fecharModal() {
    modal.style.display = 'none';
    
    document.getElementById('modal-prof').value = "";
    document.getElementById('modal-turma').value = "";
}

window.onclick = function(event) {
    if (event.target === modal) {
        fecharModal();
    }
}

// Botão de Alternância de Turno
const btnManha = document.getElementById("btn-manha");
const btnTarde = document.getElementById("btn-tarde");
const opcaoLab3 = document.getElementById("option-lab3");
const filtroLab = document.getElementById("filtro-lab");
const gradeManha = document.getElementById("grade-manha");
const gradeTarde = document.getElementById("grade-tarde");

btnTarde.addEventListener('click', function() {
    btnManha.classList.remove("active");
    btnTarde.classList.add("active");
    opcaoLab3.hidden = true;
    gradeManha.hidden = true;
    gradeTarde.hidden = false;

    if (filtroLab.value === "lab3") {
        filtroLab.value = "todos";
    }    
});

btnManha.addEventListener("click", function() {
    btnTarde.classList.remove("active");
    btnManha.classList.add("active");
    opcaoLab3.hidden = false;
    gradeManha.hidden = false;
    gradeTarde.hidden = true;
});