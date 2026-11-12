/* global expect */
// Testi 4
describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('poistaa tehtävän', () => {
    // listaan syntyy yksi tehtävä
    cy.get('#topic').type('Poistettava tehtävä');
    cy.get('#save-btn').click();

    // varmistetaan, että tehtävä on tallentunut.
    cy.get('#task-list').should('contain', 'Poistettava tehtävä');

    // hyväksytään vahvistusikkuna
    cy.on('window:confirm', () => true);

    // painetaan Delete
    cy.get('[data-action="delete"]').click();

    // tarkistetaan että tehtävä on poistunut
    cy.get('#task-list').should('not.contain', 'Poistettava tehtävä');

    cy.reload();

    // tarkistetaan localStorage
    cy.window().then((win) => {
      const tasks = JSON.parse(win.localStorage.getItem('todo_tasks_v1')) || [];
      expect(tasks).to.have.length(0);
      // luettiin tallennetut tehtävät
    });
  });
});
