/// <reference types="cypress" />

context('Sample test', () => {

    it("check if link is present", () => {
        cy.visit("http://localhost:3000/");
        cy.get("[data-cy=test-link-id]").should("have.text", "Learn React");
    })

})