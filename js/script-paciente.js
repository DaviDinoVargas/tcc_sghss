document.addEventListener('DOMContentLoaded', () => {
    // Dados de exemplo
    const patients = [
        {
            id: 1,
            name: "Alex Silva",
            cpf: "123.456.789-00",
            age: 68,
            conditions: ["Insuficiência cardíaca", "Hipertensão"],
            lastAppointment: "15/07/2025"
        },
        {
            id: 2,
            name: "Maria Oliveira",
            cpf: "987.654.321-00",
            age: 55,
            conditions: ["Diabetes tipo 2"],
            lastAppointment: "14/07/2025"
        },
        {
            id: 3,
            name: "Carlos Mendes",
            cpf: "456.789.123-00",
            age: 72,
            conditions: ["Arritmia", "Hipertensão"],
            lastAppointment: "12/07/2025"
        },
        {
            id: 4,
            name: "Fernanda Costa",
            cpf: "789.123.456-00",
            age: 45,
            conditions: ["Colesterol alto"],
            lastAppointment: "10/07/2025"
        },
        {
            id: 5,
            name: "Roberto Alves",
            cpf: "321.654.987-00",
            age: 60,
            conditions: ["Doença arterial coronariana"],
            lastAppointment: "08/07/2025"
        }
    ];

    const patientsList = document.getElementById('patients-list');
    const searchInput = document.getElementById('search-input');
    const addPatientBtn = document.getElementById('add-patient');
    const toggleSidebar = document.getElementById('toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');

    // Renderizar lista de pacientes
    function renderPatients(patientsData) {
        patientsList.innerHTML = '';
        
        patientsData.forEach(patient => {
            const conditionsHTML = patient.conditions.map(condition => 
                `<span class="condition-tag">${condition}</span>`
            ).join('');
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <strong>${patient.name}</strong>
                </td>
                <td>${patient.cpf}</td>
                <td>${patient.age} anos</td>
                <td>${conditionsHTML}</td>
                <td>${patient.lastAppointment}</td>
                <td class="actions-cell">
                    <button class="action-btn view" aria-label="Visualizar paciente" data-id="${patient.id}">
                        <span class="material-icons">visibility</span>
                    </button>
                    <button class="action-btn edit" aria-label="Editar paciente" data-id="${patient.id}">
                        <span class="material-icons">edit</span>
                    </button>
                    <button class="action-btn delete" aria-label="Excluir paciente" data-id="${patient.id}">
                        <span class="material-icons">delete</span>
                    </button>
                </td>
            `;
            
            patientsList.appendChild(row);
        });
        
        // Adicionar event listeners aos botões
        document.querySelectorAll('.action-btn.view').forEach(btn => {
            btn.addEventListener('click', () => viewPatient(btn.dataset.id));
        });
        
        document.querySelectorAll('.action-btn.edit').forEach(btn => {
            btn.addEventListener('click', () => editPatient(btn.dataset.id));
        });
        
        document.querySelectorAll('.action-btn.delete').forEach(btn => {
            btn.addEventListener('click', () => deletePatient(btn.dataset.id));
        });
    }

    // Funções de ação
    function viewPatient(patientId) {
        const patient = patients.find(p => p.id == patientId);
        alert(`Visualizando paciente: ${patient.name}\nCPF: ${patient.cpf}\nIdade: ${patient.age}`);
    }

    function editPatient(patientId) {
        const patient = patients.find(p => p.id == patientId);
        alert(`Editando paciente: ${patient.name}`);
        // Aqui seria a lógica para abrir um formulário de edição
    }

    function deletePatient(patientId) {
        const patient = patients.find(p => p.id == patientId);
        if (confirm(`Tem certeza que deseja excluir o paciente ${patient.name}?`)) {
            alert(`Paciente ${patient.name} excluído com sucesso!`);
            // Aqui seria a lógica para remover do array e atualizar a tabela
            const index = patients.findIndex(p => p.id == patientId);
            if (index !== -1) {
                patients.splice(index, 1);
                renderPatients(patients);
            }
        }
    }

    // Filtro de busca
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredPatients = patients.filter(patient => 
            patient.name.toLowerCase().includes(searchTerm) || 
            patient.cpf.includes(searchTerm)
        );
        renderPatients(filteredPatients);
    });

    // Botão para adicionar novo paciente
    addPatientBtn.addEventListener('click', () => {
        alert('Abrindo formulário para novo paciente...');
        // Aqui seria a lógica para abrir um modal/formulário
    });

    // Toggle sidebar em telas menores
    toggleSidebar.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    // Renderizar pacientes inicialmente
    renderPatients(patients);
});