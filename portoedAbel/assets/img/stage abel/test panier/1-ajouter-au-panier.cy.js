/// <reference types="cypress" />

import {connexion, carte} from './helper';
import {link} from "./constants.json";

context('Panier', () => {

    let {linkproduct, linkcommande} = link;

    beforeEach(() => {
        cy.fixture('users.json').as('usersData');
        cy.visit('/');
    });

  it('ajoute un élément au panier', () => {

    // direction la page produit
    cy.visit(linkproduct);

    // choisi un produit aléatoire sur la page
    cy.get('.add-to-cart', { waitForAnimations: true }).then(($elementsListing) => {
    const randomIndexListing = Math.floor(Math.random() * $elementsListing.length);
    const randomElementListing = $elementsListing.eq(randomIndexListing);
    cy.wrap(randomElementListing).invoke('css', 'opacity', '1');

    cy.wrap(randomElementListing).should('be.visible').click({ force: true, waitForAnimations: true }).wait(500);
    });

    // choisi un poid aléatoire
    const chance = Math.random() < 0.5;
    if (chance) {
      cy.get('input.input-radio[data-product-attribute="3"][name="group[3]"][value="8"]')
      .click({ force: true , multiple : true});
    }

    // choisi une quantité aléatoire
    const quantite = Math.floor(Math.random() * 13) + 1;
    for (let i = 0; i < quantite; i++) {
      cy.get('button.btn.btn-touchspin.js-touchspin.bootstrap-touchspin-up', { waitForAnimations: true }).wait(500)
      .click({ waitForAnimations: true }).wait(500);
    }
    cy.get('button.btn.btn-primary.add-to-cart').first().wait(1000)
    .should('exist')
    .click({waitForAnimations : true,force : true}).wait(2000);

    cy.get('button.btn.btn-secondary[data-dismiss="modal"]')
    .click({multiple : true,force : true , waitForAnimations : true}).wait(2000);

    // verifie quantité panier
    cy.get('span.elementor-button-icon[data-counter]')
    .invoke('attr', 'data-counter')
    .then(quantity => {
      const quantiteInt = parseInt(quantite + 1);
      const panierInt = parseInt(quantity);

      if (quantiteInt !== panierInt) {
        throw new Error(` ${panierInt} est différente de ${quantiteInt}. Arrêt du test.`);
      }
    });

    cy.visit(linkcommande);

    connexion();

    cy.get('button.continue.btn.btn-primary.float-xs-right', { waitForAnimations: true }).click({waitForAnimations: true , force: true , multiple : true }).wait(500);

    cy.get('input#delivery_option_105').click();

    // check validation commande
    cy.get('button[name="confirmDeliveryOption"]').contains('Continuer')
    .click({waitForAnimations: true ,force : true,  multiple : true }).wait(500);

    carte();
    
  });
});

