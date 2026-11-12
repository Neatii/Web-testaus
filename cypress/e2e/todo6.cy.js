// Testi 6
describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('järjestää tehtävät prioriteetin mukaan', () => {
    // Low
    cy.get('#topic').type('Low tehtävä');
    cy.get('#priority').select('low');
    cy.get('#save-btn').click();

    // High
    cy.get('#topic').type('High tehtävä');
    cy.get('#priority').select('high');
    cy.get('#save-btn').click();

    cy.get('.task .title').first().should('contain', 'High tehtävä');
  });
});
