describe('JAMK Wikipedia test', () => {
  it('searches JAMK and changes language to English', () => {
    cy.viewport(1920, 1080);
    // kohta 1: Menee suomenkieliselle wikipedian pääsivulle.
    cy.visit('https://fi.wikipedia.org/wiki/Wikipedia:Etusivu');

    // kohta 2: Etsii hakukentän, kirjoittaa siihen "Jamk" ja hakee.
    cy.get('.vector-search-box-show-thumbnail').eq(0).click();

    cy.wait(1000);
    cy.get('#searchform').find('input').eq(0).click().type('Jamk{enter}');

    //kohta 3: Tarkistaa, että olemme oikealla sivulla.
    cy.url().should('include', 'Jyv%C3%A4skyl%C3%A4n_ammattikorkeakoulu');

    // kohta 4: Rullaa kohtaan "Kampukset".
    cy.get('#mw-content-text')
      .contains('Kampukset')
      .scrollIntoView()
      .should('be.visible');

    // kohta 5: Tarkistaa, että "Kampukset" on näkyvillä.
    cy.get('#Kampukset').should('be.visible');

    // kohta 6: Odottaa 5 sekuntia.
    cy.wait(5000);

    // kohta 7: Vaihtaa kielen englanniksi, jolloin meidän tulisi päätyä
    // Jamkin sivuille englanninkielisessä wikipediassa.
    cy.contains('English').click({ force: true });

    // kohta 8: Tarkistaa, että uusi sivu on oikea.
    cy.url().should('include', 'JAMK_University_of_Applied_Sciences');
  });
});
