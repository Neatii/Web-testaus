describe('Pizza Online', () => {
  it('täyttää pizzatilauksen', () => {
    // 1. Menee sivustolle
    cy.visit('https://tiko.jamk.fi/~imjar/fronttiper/esimteht/pizza_anim/');

    // 2. Täyttää nimi-kentän tiedot, ja tarkistaa että ne ovat oikein
    cy.get('#nimi')
      .type('Pekka Pekkanen')
      .should('have.value', 'Pekka Pekkanen');

    // 3. Täyttää puhelin-kentän tiedot, ja tarkistaa että ne ovat oikein
    cy.get('#puhelin').type('0401234567').should('have.value', '0401234567');

    // 4. Täyttää sähköposti-kentän tiedot, ja tarkistaa että ne ovat oikein
    cy.get('#sposti')
      .type('pekka@testi.fi')
      .should('have.value', 'pekka@testi.fi');

    // 5. Valitsee halutun koon
    cy.get('#koko').select('Pieni');

    // 6. Valitsee halutun pohjan
    cy.contains('Ruis (+1 e').click();

    // 7. Valitsee halutut täytteet
    cy.contains('Ananas').click();
    cy.contains('Sipuli').click();
    cy.contains('Kinkku').click();

    // 8. Tarkistaa, että "Maksa tilaus" -nappulan yläpuolella oleva
    // hinta-elementissä on oikea loppusumma.
    cy.contains('Hinta: 10.00 e').should('be.visible');
  });
});
