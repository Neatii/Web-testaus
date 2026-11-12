// Testi 3
describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('merkitsee tehtävän valmiiksi', () => {
    // listaan syntyy yksi tehtävä
    cy.get('#topic').type('Valmis tehtävä');
    cy.get('#save-btn').click();

    // painetaan Complete
    cy.get('[data-action="complete"]').click();

    //tarkistetaan käyttöliitymä
    cy.get('.task').should('have.class', 'done');

    cy.reload();

    // tarkistetaan uudelleen
    cy.get('.task').should('have.class', 'done');
  });
});
