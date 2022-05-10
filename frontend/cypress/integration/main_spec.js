describe('CreditCard Input', () => {
    it('Visit page', () => {
        cy.visit('http://localhost:8080/public/index.html');
    });

    it('Correct amount of images loads', () => {
        cy.get('ce-gallery').shadow().find('.image').should('have.length', 12);
    });

    it('Forever scroll loads more images', () => {
        cy.scrollTo('bottom');
        cy.get('ce-gallery').shadow().find('.image').should('have.length', 24);
    });
});