/// <reference types="cypress" />


function connexion() {
  cy.get('@usersData').then(usersData => {
  const users = usersData.users;
    
  const user = users[0];
  cy.get('a.nav-link')
  .contains('Connexion')
  .click();

  cy.get('.form-control',{delay: 100}).eq(7)
  .type(user.email,{force : true}).should('have.value', user.email);
  
  cy.get('.form-control',{delay: 100 }).last()
  .type(user.password,{force : true}).should('have.value', user.password);

  cy.get('button.continue.btn.btn-primary.float-xs-right',{waitforAnimations : true })
  .click({multiple : true , waitForAnimations : true , force : true});
  });
}

  export default connexion;
