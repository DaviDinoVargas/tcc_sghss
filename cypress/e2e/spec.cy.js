describe('SGHSS Dashboard', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:64307/dashboard.html');
  });

  it('deve carregar a página e exibir título e cabeçalho', () => {
    cy.title().should('eq', 'SGHSS - Dashboard');
    cy.get('h1').contains('Dashboard');
    cy.get('#current-date').should('exist');
  });

  it('deve exibir o menu lateral com itens e item ativo', () => {
    cy.get('aside.sidebar nav.main-nav ul > li').should('have.length', 5);
    cy.get('aside.sidebar nav.main-nav a.active').contains('Dashboard');
    cy.get('aside.sidebar nav.main-nav a').eq(1).should('have.attr', 'href', 'agenda.html').and('contain.text', 'Agenda');
    cy.get('aside.sidebar nav.main-nav a').eq(2).should('have.attr', 'href', 'pacientes.html').and('contain.text', 'Pacientes');
  });

  it('deve exibir perfil do usuário corretamente', () => {
    cy.get('.user-profile .avatar-text').should('contain.text', 'AC');
    cy.get('.user-profile .user-info strong').should('contain.text', 'Dra. Ana Costa');
    cy.get('.user-profile .user-info span').should('contain.text', 'Cardiologia');
  });

  it('deve abrir e fechar o menu lateral ao clicar no botão hamburger', () => {
    cy.get('.sidebar').should('not.have.class', 'collapsed');
    cy.get('#toggle-sidebar').click();
    cy.get('.sidebar').should('have.class', 'collapsed');
    cy.get('#toggle-sidebar').click();
    cy.get('.sidebar').should('not.have.class', 'collapsed');
  });

  it('deve mostrar o número correto de notificações', () => {
    cy.get('.notification-count').should('have.text', '3');
  });

  it('deve exibir o banner de alerta crítico e responder ao clique no botão "Ver detalhes"', () => {
    cy.get('.alert-banner.critical').should('exist');
    cy.get('.alert-text h3').should('contain.text', 'Paciente em estado crítico');
    cy.get('.alert-text p').should('contain.text', 'Alex Silva');
    
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });
    cy.get('.btn-alert').click();
    cy.get('@alertStub').should('have.been.calledWith', 'Detalhes do paciente crítico');
  });

  it('deve listar as consultas de hoje com status e informações corretas', () => {
    cy.get('.appointments-grid .appointment-card').should('have.length', 3);

    cy.get('.appointment-card').eq(0).within(() => {
      cy.get('.badge').should('have.class', 'upcoming').and('contain.text', 'Agendada');
      cy.get('.appointment-time').should('contain.text', '09:00 - 09:30');
      cy.get('h3').should('contain.text', 'Maria Oliveira');
      cy.get('p').should('contain.text', 'Consulta de rotina');
      cy.get('.patient-info').should('contain.text', '65 anos').and('contain.text', 'Hipertensão');
      cy.get('.btn-outline').should('contain.text', 'Detalhes');
      cy.get('.btn-primary').should('contain.text', 'Iniciar');
    });

    cy.get('.appointment-card').eq(1).within(() => {
      cy.get('.badge').should('have.class', 'now').and('contain.text', 'Em andamento');
      cy.get('.appointment-time').should('contain.text', '10:00 - 10:45');
      cy.get('h3').should('contain.text', 'João Mendes');
      cy.get('p').should('contain.text', 'Acompanhamento pós-operatório');
      cy.get('.patient-info').should('contain.text', '72 anos').and('contain.text', 'Diabetes tipo 2');
      cy.get('.btn-outline').should('contain.text', 'Detalhes');
      cy.get('.btn-primary').should('contain.text', 'Continuar');
    });

    cy.get('.appointment-card').eq(2).within(() => {
      cy.get('.badge').should('have.class', 'critical').and('contain.text', 'Urgente');
      cy.get('.appointment-time').should('contain.text', '11:30');
      cy.get('h3').should('contain.text', 'Alex Silva');
      cy.get('p').should('contain.text', 'Emergência cardíaca');
      cy.get('.patient-info').should('contain.text', '68 anos').and('contain.text', 'Insuficiência cardíaca');
      cy.get('.btn-outline').should('contain.text', 'Prontuário');
      cy.get('.btn-critical').should('contain.text', 'Atender');
    });
  });

  it('deve exibir indicadores corretamente', () => {
    cy.get('.indicators-grid .indicator-card').should('have.length', 3);
    cy.get('.indicator-card').eq(0).within(() => {
      cy.get('h3').should('contain.text', 'Pacientes Hoje');
      cy.get('.indicator-value').should('contain.text', '12');
    });
    cy.get('.indicator-card').eq(1).within(() => {
      cy.get('h3').should('contain.text', 'Tempo Médio');
      cy.get('.indicator-value').should('contain.text', '22 min');
    });
    cy.get('.indicator-card').eq(2).within(() => {
      cy.get('h3').should('contain.text', 'Casos Urgentes');
      cy.get('.indicator-value').should('contain.text', '3');
    });
  });

  it('deve ter o botão do menu do usuário com redirecionamento', () => {
    cy.get('.user-menu-btn').should('contain.text', 'AC');
    cy.get('.user-menu-btn').then(($btn) => {
      expect($btn.attr('onclick')).to.contain('perfil-usuario.html');
    });
  });
});
