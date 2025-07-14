document.addEventListener('DOMContentLoaded', () => {
    const recordsContainer = document.getElementById('records-container');
    const searchInput = document.getElementById('search-input');
    const filterPatient = document.getElementById('filter-patient');
    const filterType = document.getElementById('filter-type');
    const modal = document.getElementById('record-modal');
    const modalClose = document.getElementById('modal-close');
    const modalCancel = document.getElementById('modal-cancel');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalBody = document.getElementById('modal-body');
    const downloadPdfBtn = document.getElementById('download-pdf');

    const medicalRecords = [
        {
            id: 1,
            date: '2025-07-14',
            doctor: 'Dra. Ana Costa',
            type: 'Teleconsulta',
            typeIcon: 'video_call',
            summary: 'Paciente relatou dores no peito leves. Pressão arterial medida em 140/90 mmHg. Recomendado repouso e agendada consulta presencial para avaliação complementar.',
            patient: 'Alex Silva',
            cpf: '123.456.789-00',
            details: {
                sintomas: 'Dores no peito leves, cansaço',
                diagnostico: 'Possível angina, necessita de avaliação complementar',
                prescricao: 'Repouso, evitar esforços físicos, retorno em 7 dias',
                exames: 'Eletrocardiograma agendado para 21/07/2025'
            }
        },
        {
            id: 2,
            date: '2025-07-10',
            doctor: 'Dra. Ana Costa',
            type: 'Consulta de Rotina',
            typeIcon: 'event_note',
            summary: 'Acompanhamento de rotina. Paciente estável. Exames de sangue dentro dos parâmetros normais. Manter medicação atual.',
            patient: 'Maria Oliveira',
            cpf: '987.654.321-00',
            details: {
                sintomas: 'Nenhum sintoma novo relatado',
                diagnostico: 'Controle adequado da artrite',
                prescricao: 'Manter dose atual de Metotrexato (15mg/semana)',
                exames: 'Hemograma completo - resultados normais'
            }
        },
        {
            id: 3,
            date: '2025-06-05',
            doctor: 'Dra. Ana Costa',
            type: 'Eletrocardiograma',
            typeIcon: 'favorite',
            summary: 'Realizado eletrocardiograma de rotina. Resultados dentro dos parâmetros esperados para o paciente.',
            patient: 'Alex Silva',
            cpf: '123.456.789-00',
            details: {
                sintomas: 'Monitoramento de rotina',
                diagnostico: 'ECG normal para idade do paciente',
                prescricao: 'Continuar medicação atual',
                exames: 'Eletrocardiograma - resultados normais'
            }
        }
    ];

    function formatDate(dateString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    }

    function filterRecords() {
        const searchTerm = searchInput.value.toLowerCase();
        const patientFilter = filterPatient.value;
        const typeFilter = filterType.value;

        const filteredRecords = medicalRecords.filter(record => {
            const matchesSearch = (
                record.patient.toLowerCase().includes(searchTerm) ||
                record.summary.toLowerCase().includes(searchTerm) ||
                record.type.toLowerCase().includes(searchTerm)
            );

            const matchesPatient = patientFilter ? record.patient === patientFilter : true;
            const matchesType = typeFilter ? record.type === typeFilter : true;

            return matchesSearch && matchesPatient && matchesType;
        });

        renderRecords(filteredRecords);
    }

    function renderRecords(records) {
        recordsContainer.innerHTML = '';

        if (records.length === 0) {
            recordsContainer.innerHTML = `
                <div class="no-records">
                    <span class="material-icons no-records-icon">folder_off</span>
                    <h3>Nenhum prontuário encontrado</h3>
                    <p>Tente alterar os filtros de busca</p>
                </div>
            `;
            return;
        }

        records.forEach(record => {
            const recordElement = document.createElement('div');
            recordElement.className = 'record-item';
                       recordElement.innerHTML = `
                <div class="record-header">
                    <div class="record-date">${formatDate(record.date)}</div>
                    <div class="record-doctor">${record.doctor}</div>
                </div>
                <div class="record-type">
                    <span class="material-icons record-type-icon">${record.typeIcon}</span>
                    <span>${record.type}</span>
                </div>
                <div class="record-patient">Paciente: ${record.patient}</div>
                <div class="record-summary">${record.summary}</div>
                <div class="record-actions">
                    <button class="btn-link btn-view" data-id="${record.id}">
                        <span class="material-icons">visibility</span> Visualizar
                    </button>
                    <button class="btn-link btn-download" data-id="${record.id}">
                        <span class="material-icons">download</span> Baixar PDF
                    </button>
                </div>
            `;

            recordsContainer.appendChild(recordElement);
        });

        // Adiciona eventos aos botões após renderizar
        document.querySelectorAll('.btn-view').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                openModal(id);
            });
        });

        document.querySelectorAll('.btn-download').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                generatePDF(id);
            });
        });
    }

    function openModal(id) {
        const record = medicalRecords.find(r => r.id === id);
        if (!record) return;

        modalTitle.textContent = `${record.type} - ${record.patient}`;
        modalDate.textContent = formatDate(record.date);

        modalBody.innerHTML = `
            <div class="detail-item">
                <div class="detail-label">Paciente</div>
                <div class="detail-value">${record.patient} (CPF: ${record.cpf})</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Médico Responsável</div>
                <div class="detail-value">${record.doctor}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Tipo</div>
                <div class="detail-value">${record.type}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Sintomas</div>
                <div class="detail-value">${record.details.sintomas}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Diagnóstico</div>
                <div class="detail-value">${record.details.diagnostico}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Prescrição</div>
                <div class="detail-value">${record.details.prescricao}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Exames</div>
                <div class="detail-value">${record.details.exames}</div>
            </div>
        `;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalCancel.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    function generatePDF(id) {
        const record = medicalRecords.find(r => r.id === id);
        if (!record) return;

        const doc = new jspdf.jsPDF();

        let y = 10;
        doc.setFontSize(18);
        doc.text('Prontuário Médico - VidaPlus', 10, y);
        y += 10;

        doc.setFontSize(14);
        doc.text(`Paciente: ${record.patient}`, 10, y);
        y += 8;
        doc.text(`CPF: ${record.cpf}`, 10, y);
        y += 8;
        doc.text(`Data: ${formatDate(record.date)}`, 10, y);
        y += 8;
        doc.text(`Médico: ${record.doctor}`, 10, y);
        y += 8;
        doc.text(`Tipo: ${record.type}`, 10, y);
        y += 12;

        doc.setFontSize(12);
        doc.text('Sintomas:', 10, y);
        y += 8;
        doc.text(doc.splitTextToSize(record.details.sintomas, 180), 10, y);
        y += doc.splitTextToSize(record.details.sintomas, 180).length * 8;

        doc.text('Diagnóstico:', 10, y);
        y += 8;
        doc.text(doc.splitTextToSize(record.details.diagnostico, 180), 10, y);
        y += doc.splitTextToSize(record.details.diagnostico, 180).length * 8;

        doc.text('Prescrição:', 10, y);
        y += 8;
        doc.text(doc.splitTextToSize(record.details.prescricao, 180), 10, y);
        y += doc.splitTextToSize(record.details.prescricao, 180).length * 8;

        doc.text('Exames:', 10, y);
        y += 8;
        doc.text(doc.splitTextToSize(record.details.exames, 180), 10, y);

        doc.save(`Prontuario_${record.patient.replace(/\s+/g, '')}_${formatDate(record.date).replace(/\//g, '-')}.pdf`);
    }

    searchInput.addEventListener('input', filterRecords);
    filterPatient.addEventListener('change', filterRecords);
    filterType.addEventListener('change', filterRecords);

    filterRecords();
});

