document.addEventListener('DOMContentLoaded', () => {
    const currentDateElement = document.getElementById('current-date');
    const today = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    currentDateElement.textContent = today.toLocaleDateString('pt-BR', options);

    const notificationCount = document.querySelector('.notification-count');
    notificationCount.textContent = '3';

    const alertBtn = document.querySelector('.btn-alert');
    if (alertBtn) {
        alertBtn.addEventListener('click', () => {
            alert('Detalhes do paciente crítico');
        });
    }

    const appointmentButtons = document.querySelectorAll('.appointment-footer button');
    appointmentButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = button.closest('.appointment-card');
            const patientName = card.querySelector('h3').textContent;

            if (button.classList.contains('btn-primary') || button.classList.contains('btn-critical')) {
                alert(`Iniciando atendimento de ${patientName}`);
                window.location.href = 'telemedicina.html';
            } else {
                alert(`Abrindo detalhes de ${patientName}`);
            }
        });
    });

    const toggleSidebarBtn = document.getElementById('toggle-sidebar');
    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('collapsed');
        });
    }
});
