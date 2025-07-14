document.addEventListener('DOMContentLoaded', () => {
    // Toggle sidebar open/collapsed
    const toggleSidebarBtn = document.getElementById('toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');

    toggleSidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    // Buttons agenda simulados
    document.getElementById('prev-week').addEventListener('click', () => {
        alert('Semana anterior');
    });

    document.getElementById('next-week').addEventListener('click', () => {
        alert('Próxima semana');
    });

    document.getElementById('today-btn').addEventListener('click', () => {
        alert('Voltar para hoje');
    });

    document.getElementById('new-appointment').addEventListener('click', () => {
        alert('Novo agendamento');
    });
});
