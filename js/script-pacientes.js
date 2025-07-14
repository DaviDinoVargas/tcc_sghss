document.addEventListener('DOMContentLoaded', () => {
    const patientsList = document.getElementById('patients-list');
    const addPatientBtn = document.getElementById('add-patient');
    const searchInput = document.getElementById('search-input');

    // Inicializar dados se não existirem
    function initPatientsData() {
        if (!localStorage.getItem('patients')) {
            const initialPatients = [
                {
                    id: 1,
                    nome: 'Carlos Silva',
                    cpf: '123.456.789-00',
                    dataNascimento: '1957-05-15',
                    condicoes: ['Hipertensão', 'Diabetes'],
                    ultimaConsulta: '2025-07-10'
                },
                {
                    id: 2,
                    nome: 'Maria Oliveira',
                    cpf: '987.654.321-00',
                    dataNascimento: '1960-03-22',
                    condicoes: ['Artrite'],
                    ultimaConsulta: '2025-07-12'
                }
            ];
            localStorage.setItem('patients', JSON.stringify(initialPatients));
        }
    }

    // Calcular idade
    function calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }

    // Formatar data para pt-BR
    function formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    // Carregar pacientes na tabela
    function loadPatients(searchTerm = '') {
        initPatientsData();
        const patients = JSON.parse(localStorage.getItem('patients')) || [];
        patientsList.innerHTML = '';

        const filteredPatients = patients.filter(patient =>
            patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.cpf.includes(searchTerm)
        );

        if (filteredPatients.length === 0) {
            patientsList.innerHTML = `
                <tr>
                    <td colspan="6" class="no-patients">
                        Nenhum paciente encontrado
                    </td>
                </tr>
            `;
            return;
        }

        filteredPatients.forEach(patient => {
            const age = calculateAge(patient.dataNascimento);
            const conditions = patient.condicoes.join(', ');

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${patient.nome}</td>
                <td>${patient.cpf}</td>
                <td>${age} anos</td>
                <td>${conditions}</td>
                <td>${formatDate(patient.ultimaConsulta)}</td>
                <td class="actions-cell">
                    <button class="btn-icon btn-view" title="Visualizar" data-id="${patient.id}">👁️</button>
                    <button class="btn-icon btn-edit" title="Editar" data-id="${patient.id}">✏️</button>
                    <button class="btn-icon btn-delete" title="Excluir" data-id="${patient.id}">🗑️</button>
                </td>
            `;

            patientsList.appendChild(row);
        });

        // Eventos dos botões
        document.querySelectorAll('.btn-view').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                window.location.href = `paciente-detalhes.html?id=${id}`;
            });
        });

        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                window.location.href = `paciente-form.html?id=${id}`;
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                if (confirm('Tem certeza que deseja excluir este paciente?')) {
                    deletePatient(id);
                }
            });
        });
    }

    // Excluir paciente
    function deletePatient(id) {
        const patients = JSON.parse(localStorage.getItem('patients')) || [];
        const updatedPatients = patients.filter(p => p.id !== parseInt(id));
        localStorage.setItem('patients', JSON.stringify(updatedPatients));
        loadPatients(searchInput.value);
    }

    // Novo paciente
    addPatientBtn.addEventListener('click', () => {
        window.location.href = 'paciente-form.html';
    });

    // Busca ao digitar
    searchInput.addEventListener('input', () => {
        loadPatients(searchInput.value);
    });

    // Inicializa tabela
    loadPatients();
});
