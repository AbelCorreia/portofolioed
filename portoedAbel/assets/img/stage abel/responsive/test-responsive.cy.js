/// <reference types="cypress" />
import dimensions from './responsive/dimensions'

beforeEach(() => {
    cy.on('uncaught:exception', (err, runnable) => {
        return false
    })
})


describe("test responsive", () => {
  
    Object.values(dimensions).map((key, i) => {
        it('test taille header', () => {

            if (window.navigator.userAgentData && window.navigator.userAgentData.brands && window.navigator.userAgentData.brands.some(function (brand) { return brand.brand === 'Microsoft Edge'; })) {
                // Microsoft Edge
                var px = 15;
            } else if (window.navigator.userAgent.indexOf("Chrome") !== -1) {
                // Google Chrome
                var px = 17;
            } else if (window.navigator.userAgent.indexOf("Firefox") !== -1) {
                // Firefox
                var px = 17;
            } else if (window.navigator.userAgent.indexOf("Electron") !== -1) {
                // Electron
                var px = 17;
            }
            
            cy.viewport(key.viewportWidth, key.viewportWeight);

            cy.visit("https://www.cafes-pfaff.com/");

            const expectedWidth = key.viewportWidth;
            
            cy.get('div[data-elementor-id="8170101"]').should('have.class', 'elementor elementor-8170101').then(($div) => {
                const actualWidth = $div.width();
                expect(actualWidth).to.equal(expectedWidth - px);
            });
            cy.get('div.elementor-section-wrap').then(($div2) => {
                const actuelWidth = $div2.width();
                expect(actuelWidth).to.equal(expectedWidth - px);
            });

        });
    });
});