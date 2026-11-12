/* global expect */
// Testi 7
describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('ei luo tehtävää ilman nimeä', () => {
    cy.get('#save-btn').click();

    cy.get('.task').should('not.exist');

    // tarkistetaan localStorage
    cy.window().then((win) => {
      const tasks = JSON.parse(win.localStorage.getItem('todo_tasks_v1')) || [];
      expect(tasks).to.have.length(0);
      // luettiin tallennetut tehtävät
    });
  });
});
