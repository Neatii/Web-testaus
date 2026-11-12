// Testi 2
describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('muokkaa olemassa olevaa tehtävää', () => {
    cy.get('#topic').type('Vanha nimi');
    cy.get('#save-btn').click();

    cy.get('[data-action="edit"]').first().click();

    cy.get('#topic').clear().type('Uusi nimi');

    cy.get('#save-btn').click();
    cy.get('#task-list').should('contain', 'Uusi nimi');

    cy.get('#task-list').should('not.contain', 'Vanha nimi');

    cy.reload();

    cy.get('#task-list').should('contain', 'Uusi nimi');
  });
});
