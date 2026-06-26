const modal = document.getElementById('modalAgendamento');
const formAgendamento = document.querySelector('.modal-form');
let elementoAlvo = null;

/**Abre o modal e armazena o elemento clicado
 * @param {HTMLElement} elemento 
 */
function abrirModal(elemento) {
    elementoAlvo = elemento;
    modal.style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modal-prof').value = "";
    document.getElementById('modal-turma').value = "";
    elementoAlvo = null;
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === modal) {
        fecharModal();
    }
}

formAgendamento.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const selectProf = document.getElementById("modal-prof");
    const selectTurma = document.getElementById("modal-turma");
    
    const nomeProf = selectProf.options[selectProf.selectedIndex].text;
    const nomeTurma = selectTurma.options[selectTurma.selectedIndex].text;
    
    if (elementoAlvo) {
        const elementoPai = elementoAlvo.parentElement;
        // CORRIGIDO: alterado dPai para elementoPai, e nomeProfessor para nomeProf
        elementoPai.innerHTML = `<div class="card-aula">${nomeTurma} - ${nomeProf}</div>`;
    }
    
    fecharModal();
});

// =========================================================
// 4. ALTERNÂNCIA DE TURNO
// =========================================================
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