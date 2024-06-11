document.addEventListener('DOMContentLoaded', function() {
    const tituloTarefaInput = document.getElementById('tituloTarefaInput');
    const diaTarefaInput = document.getElementById('diaTarefaInput');
    const horaTarefaInput = document.getElementById('horaTarefaInput');
    const descricaoTarefaInput = document.getElementById('descricaoTarefaInput');
    const dataInicioTarefaInput = document.getElementById('dataInicioTarefaInput');
    const dataFimTarefaInput = document.getElementById('dataFimTarefaInput');
    const localizacaoTarefaInput = document.getElementById('localizacaoTarefaInput');
    const adicionarTarefaButton = document.getElementById('adicionarTarefaButton');
    const buscarTarefaInput = document.getElementById('buscarTarefaInput');
    const listaTarefas = document.getElementById('listaTarefas');

    // Carregar tarefas salvas
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    renderizarTarefas(tarefas);

    adicionarTarefaButton.addEventListener('click', function() {
        const titulo = tituloTarefaInput.value;
        const dia = diaTarefaInput.value;
        const hora = horaTarefaInput.value;
        const descricao = descricaoTarefaInput.value;
        const dataInicio = dataInicioTarefaInput.value;
        const dataFim = dataFimTarefaInput.value;
        const localizacao = localizacaoTarefaInput.value;

        if (titulo && dia && hora && descricao && dataInicio && dataFim && localizacao) {
            const novaTarefa = { titulo, dia, hora, descricao, dataInicio, dataFim, localizacao };
            tarefas.push(novaTarefa);
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            renderizarTarefas(tarefas);
            tituloTarefaInput.value = '';
            diaTarefaInput.value = 'Domingo';
            horaTarefaInput.value = '';
            descricaoTarefaInput.value = '';
            dataInicioTarefaInput.value = '';
            dataFimTarefaInput.value = '';
            localizacaoTarefaInput.value = '';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    buscarTarefaInput.addEventListener('input', function() {
        const termoBusca = buscarTarefaInput.value.toLowerCase();
        const tarefasFiltradas = tarefas.filter(tarefa => 
            tarefa.titulo.toLowerCase().includes(termoBusca) || 
            tarefa.dia.toLowerCase().includes(termoBusca)
        );
        renderizarTarefas(tarefasFiltradas);
    });

    function renderizarTarefas(tarefas) {
        listaTarefas.innerHTML = '';
        tarefas.forEach((tarefa, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `
                <div>
                    <h5>${tarefa.titulo}</h5>
                    <p>${tarefa.descricao}</p>
                    <p><strong>Data de Início:</strong> ${tarefa.dataInicio}</p>
                    <p><strong>Data de Fim:</strong> ${tarefa.dataFim}</p>
                    <p><strong>Dia:</strong> ${tarefa.dia}</p>
                    <p><strong>Hora:</strong> ${tarefa.hora}</p>
                    <p><strong>Localização:</strong> ${tarefa.localizacao}</p>
                </div>
                <button onclick="removerTarefa(${index})">&times;</button>
            `;
            listaTarefas.appendChild(li);
        });
    }

    window.removerTarefa = function(index) {
        tarefas.splice(index, 1);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        renderizarTarefas(tarefas);
    };
});

document.addEventListener('DOMContentLoaded', function() {
    // Seu código JavaScript existente aqui...

    const turmaSelect = document.getElementById('turmaSelect');
    const gerarChecklistButton = document.getElementById('gerarChecklistButton');
    const checklistContainer = document.getElementById('checklist');

    // Array de nomes e sobrenomes para gerar nomes aleatórios
    const nomes = ['João', 'Maria', 'José', 'Ana', 'Pedro', 'Mariana', 'Carlos', 'Amanda', 'Lucas', 'Juliana', 'Fernando', 'Camila', 'Paulo', 'Patrícia', 'Gustavo', 'Laura', 'Rafael', 'Isabela', 'Diego', 'Tatiane'];
    const sobrenomes = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Pereira', 'Lima', 'Costa', 'Fernandes', 'Rodrigues', 'Almeida', 'Nascimento', 'Ribeiro', 'Carvalho', 'Gomes', 'Martins', 'Alves', 'Araújo', 'Barbosa', 'Cardoso', 'Correia'];

    const alunos = {
        turma1: gerarNomesAleatorios(20),
        turma2: gerarNomesAleatorios(20),
        turma3: gerarNomesAleatorios(20)
        // Adicione mais turmas e alunos conforme necessário
    };

    gerarChecklistButton.addEventListener('click', function() {
        const turmaSelecionada = turmaSelect.value;
        const alunosTurma = alunos[turmaSelecionada];
        renderizarChecklist(alunosTurma);
    });

    function gerarNomesAleatorios(quantidade) {
        const nomesAleatorios = [];
        for (let i = 0; i < quantidade; i++) {
            const nome = nomes[Math.floor(Math.random() * nomes.length)];
            const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
            nomesAleatorios.push(`${nome} ${sobrenome}`);
        }
        return nomesAleatorios;
    }

    function renderizarChecklist(alunosTurma) {
        checklistContainer.innerHTML = '';
        alunosTurma.forEach(aluno => {
            const div = document.createElement('div');
            div.className = 'checkbox-item';
            div.innerHTML = `
                <input type="checkbox" id="${aluno}" name="${aluno}">
                <label for="${aluno}">${aluno}</label>
            `;
            checklistContainer.appendChild(div);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Seu código JavaScript existente aqui...

    const inscricaoForm = document.getElementById('inscricaoForm');
    const participantesList = document.getElementById('participantesList');

    inscricaoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nome = document.getElementById('nomeParticipanteInput').value;
        const email = document.getElementById('emailParticipanteInput').value;
        const evento = document.getElementById('eventoSelect').value;
        inscreverParticipante(nome, email, evento);
    });

    function inscreverParticipante(nome, email, evento) {
        const participanteItem = document.createElement('li');
        participanteItem.className = 'list-group-item participante-item';
        participanteItem.innerHTML = `
            <strong>Nome:</strong> ${nome}<br>
            <strong>Email:</strong> ${email}<br>
            <strong>Evento:</strong> ${evento}
        `;
        participantesList.appendChild(participanteItem);
    }
});
