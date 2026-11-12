// Testi 5
describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('säilyttää tehtävän sivun päivityksen jälkeen', () => {
    // listaan syntyy yksi tehtävä
    cy.get('#topic').type('Tietokanta');
    cy.get('#description').type('SQL harjoitus');

    cy.get('#save-btn').click();

    cy.reload();

    // varmistetaan, että tehtävä on tallentunut.
    cy.get('#task-list').should('contain', 'Tietokanta');

    cy.get('#task-list').should('contain', 'SQL harjoitus');
  });
});
