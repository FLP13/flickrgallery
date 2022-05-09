describe('CreditCard Input', () => {
    it('Visit page', () => {
        cy.visit('http://localhost:8080/public/index.html');
    });

    /* it('Input fields', () => {
        cy.get('#cardnumber').type('4423213442983213');
        cy.get('#name').type('Alexander The Great');
        cy.get('#month').select('June');
        cy.get('#year').select('2022');
        cy.get('#cvc').type('123');
    });

    it('Clicks submit and fields are reset', () => {
        cy.get('button').click();
        cy.get('#cardnumber').should('have.value', '');
        cy.get('#name').should('have.value', '');
        cy.get('#month').should('have.value', 'Month');
        cy.get('#year').should('have.value', 'Year');
        cy.get('#cvc').should('have.value', '');
    });

    it('Input fields with invalid credit card number', () => {
        cy.get('#cardnumber').type('442321344');
        cy.get('#name').type('Alexander The Great');
        cy.get('#month').select('June');
        cy.get('#year').select('2022');
        cy.get('#cvc').type('123');
    });

    it('Clicks submit and error message is visible', () => {
        cy.get('button').click();
        cy.get('#validationmessage');
    }); */
});