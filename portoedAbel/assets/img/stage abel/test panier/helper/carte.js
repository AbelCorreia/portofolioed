/// <reference types="cypress" />

function carte(user) {

  cy.get('@usersData').then(usersData => {
    const users = usersData.users;
    
    const user = users[0];

      cy.get('#payment-option-4')
      .click().wait(500);

      cy.get('input[id="conditions_to_approve[terms-and-conditions]"][name="conditions_to_approve[terms-and-conditions]"][required][type="checkbox"][value="1"][class="ps-shown-by-js"]')
      .click().wait(500);

      cy.get('button.btn.btn-primary.center-block')
      .contains('Commander').click({force : true}).wait(5000);

      cy.iframe('#iframe-payplug')
      .should('exist');
      
      cy.iframe('#iframe-payplug')
      .find('input[type="tel"]')
      .first()
      .type(user.numcarte);

      cy.iframe('#iframe-payplug')
      .find('input[type="tel"]')
      .eq(1)
      .type(user.datecarte);


      cy.iframe('#iframe-payplug')
      .find('input[type="tel"]')
      .last()
      .type(user.cryptogramme);

      cy.iframe('#iframe-payplug')
      .find('button[type="submit"]')
      .first()
      .click();
      

  });
}
   export default carte;