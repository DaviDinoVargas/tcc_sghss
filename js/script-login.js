document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const cpfInput = document.getElementById('cpf');
    const passwordInput = document.getElementById('senha');
    const togglePassword = document.getElementById('toggle-password');
    
    // Máscara de CPF
    cpfInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0,11);
        
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
        
        e.target.value = value;
    });
    
    // Alternar visibilidade da senha
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Alterar ícone
        const icon = togglePassword.querySelector('.material-icons');
        if (type === 'password') {
            icon.textContent = 'visibility';
            togglePassword.setAttribute('aria-label', 'Mostrar senha');
        } else {
            icon.textContent = 'visibility_off';
            togglePassword.setAttribute('aria-label', 'Ocultar senha');
        }
    });
    
    // Validação de login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        // Reset errors
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        document.querySelectorAll('input').forEach(input => {
            input.removeAttribute('aria-invalid');
        });
        
        // Validação de CPF
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!cpfRegex.test(cpfInput.value)) {
            showError(cpfInput, 'CPF inválido');
            isValid = false;
        }
        
        // Validação de senha
        if (passwordInput.value.length < 8) {
            showError(passwordInput, 'Senha deve ter no mínimo 8 caracteres');
            isValid = false;
        }
        
        if (isValid) {
            // Simulação de redirecionamento
            console.log('Login válido, redirecionando...');
            window.location.href = 'dashboard.html';
        }
    });
    
    function showError(input, message) {
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            input.setAttribute('aria-invalid', 'true');
            input.focus();
        }
    }
});