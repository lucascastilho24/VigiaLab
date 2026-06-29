const modal = document.getElementById('modalAgendamento');
const formAgendamento = document.querySelector('.modal-form');
let elementoAlvo = null;
const modalCancelar = document.getElementById("modalCancelar");
const cancelarInfo = document.getElementById("cancelar-info");
const btnConfirmarCancelamento = document.getElementById("btn-confirmar-cancelar");

/**Abre o modal e armazena o elemento clicado
 * @param {HTMLElement} elemento 
 */
function abrirModal(elemento) {
    elementoAlvo = elemento;

    if (elemento.classList.contains("vago")) {
        modal.style.display = "flex";
    }

    else if (elemento.classList.contains("card-aula")) {
        cancelarInfo.textContent = elemento.textContent;
        modalCancelar.style.display = "flex";
    }
}

function fecharModal() {
    document.getElementById('modal-prof').value = "";
    document.getElementById('modal-turma').value = "";
    elementoAlvo = null;
    modal.style.display = 'none';
}

function fecharModalCancelar() {
    elementoAlvo = null;
    modalCancelar.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        fecharModal();
    }
    if (event.target === modalCancelar) {
        fecharModalCancelar();
    }
}

//Salvar informações
formAgendamento.addEventListener("submit", function(event) {
    event.preventDefault();
    const selectProf = document.getElementById("modal-prof");
    const selectTurma = document.getElementById("modal-turma");
    const nomeProf = selectProf.options[selectProf.selectedIndex].text;
    const nomeTurma = selectTurma.options[selectTurma.selectedIndex].text;
    
    if (elementoAlvo) {
        const elementoPai = elementoAlvo.parentElement;
        elementoPai.innerHTML = `<div class="card-aula" onclick="abrirModal(this)">${nomeTurma} - ${nomeProf}</div>`;
    }
    
    fecharModal();
});

//Cancelar Agendamento
btnConfirmarCancelamento.addEventListener('click', function() {
    if (elementoAlvo) {
        const elementoPai = elementoAlvo.parentElement;
        elementoPai.innerHTML = `<span class="vago" onclick="abrirModal(this)">+ Disponível</span>`;
    }
    fecharModalCancelar();
});

//Botão de alternância de turno
const btnManha = document.getElementById("btn-manha");
const btnTarde = document.getElementById("btn-tarde");
const opcaoLab3 = document.getElementById("option-lab3");
const filtroLab = document.getElementById("filtro-lab");
let turnoAtual = "manha"; 

function atualizarFiltros() {
    const filtroAtual = filtroLab.value;
    const todosOsBlocos = document.querySelectorAll(".bloco-grade");

    todosOsBlocos.forEach(bloco => {
        const recursoDoBloco = bloco.dataset.recurso;
        const turnoDoBloco = bloco.dataset.turno;
        const bateTurno = (turnoDoBloco === turnoAtual);
        const bateRecurso = (filtroAtual === "todos" || recursoDoBloco === filtroAtual);

        if (bateTurno && bateRecurso) {
            bloco.hidden = false;
        } else {
            bloco.hidden = true;
        }
    });
}

filtroLab.addEventListener("change", atualizarFiltros);

btnTarde.addEventListener('click', function() {
    btnManha.classList.remove("active");
    btnTarde.classList.add("active");
    opcaoLab3.hidden = true; // Esconde o Lab 3 do menu dropdown
    turnoAtual = "tarde"; // Atualiza nosso estado

    if (filtroLab.value === "lab3") {
        filtroLab.value = "todos";
    }

    atualizarFiltros(); // Executa a nossa função mestre
});

btnManha.addEventListener("click", function() {
    btnTarde.classList.remove("active");
    btnManha.classList.add("active");
    opcaoLab3.hidden = false; // Exibe de volta o Lab 3 no dropdown
    turnoAtual = "manha";
    atualizarFiltros();
});