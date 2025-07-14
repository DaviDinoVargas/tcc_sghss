document.addEventListener('DOMContentLoaded', () => {
    // Atualizar tempo da chamada
    let callSeconds = 0;
    const callDuration = document.querySelector('.call-duration');
    
    const timer = setInterval(() => {
        callSeconds++;
        const minutes = Math.floor(callSeconds / 60);
        const seconds = callSeconds % 60;
        callDuration.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
    
    // Controles da chamada
    const toggleMic = document.getElementById('toggle-mic');
    const toggleCamera = document.getElementById('toggle-camera');
    const endCall = document.querySelector('.end-call');
    
    toggleMic.addEventListener('click', () => {
        const icon = toggleMic.querySelector('.material-icons');
        if (icon.textContent === 'mic') {
            icon.textContent = 'mic_off';
            toggleMic.setAttribute('aria-label', 'Ativar áudio');
            alert('Áudio mutado');
        } else {
            icon.textContent = 'mic';
            toggleMic.setAttribute('aria-label', 'Mutar áudio');
            alert('Áudio ativado');
        }
    });
    
    toggleCamera.addEventListener('click', () => {
        const icon = toggleCamera.querySelector('.material-icons');
        if (icon.textContent === 'videocam') {
            icon.textContent = 'videocam_off';
            toggleCamera.setAttribute('aria-label', 'Ativar vídeo');
            alert('Vídeo desativado');
        } else {
            icon.textContent = 'videocam';
            toggleCamera.setAttribute('aria-label', 'Desativar vídeo');
            alert('Vídeo ativado');
        }
    });
    
    endCall.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja encerrar a chamada?')) {
            clearInterval(timer);
            alert('Chamada encerrada. Redirecionando...');
            window.location.href = 'dashboard.html';
        }
    });
    
    // Botões restantes (compartilhar tela e chat)
    const screenShareBtn = document.querySelector('[aria-label="Compartilhar tela"]');
    const chatBtn = document.querySelector('[aria-label="Abrir chat"]');
    
    screenShareBtn.addEventListener('click', () => {
        alert('Compartilhamento de tela ativado.');
    });
    
    chatBtn.addEventListener('click', () => {
        alert('Abrindo chat...');
    });
    
    // Botão de emitir receita
    const prescriptionBtn = document.querySelector('.prescription-form .btn-primary');
    prescriptionBtn.addEventListener('click', () => {
        const prescriptionText = document.querySelector('.prescription-form textarea').value;
        if (prescriptionText.trim() === '') {
            alert('Por favor, insira a prescrição médica.');
            return;
        }
        
        alert('Receita emitida com sucesso!');
        // Aqui seria o envio para o backend e geração do PDF
    });
});