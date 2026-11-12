/* global expect */
// Testi 1
describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('luo uuden tehtävän', () => {
    cy.get('#topic').type('Koulu');
    cy.get('#priority').select('high');
    cy.get('#status').select('todo');
    cy.get('#description').type('Testaus tehtävät');

    cy.get('#save-btn').click();

    cy.get('#task-list').should('contain', 'Testaus tehtävät');

    cy.window().then((win) => {
      const tasks = JSON.parse(win.localStorage.getItem('todo_tasks_v1'));

      expect(tasks).to.have.length(1);
      expect(tasks[0].topic).to.equal('Koulu');
    });
  });
});
