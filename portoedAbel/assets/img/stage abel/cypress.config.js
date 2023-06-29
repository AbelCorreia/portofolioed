const { defineConfig } = require("cypress");

module.exports = defineConfig({
  pageLoadTimeout : 120000 ,
  e2e: {
    "experimentalWebKitSupport" : true,
    "experimentalMemoryManagement" : true,
    "numTestsKeptInMemory" : 1 ,
    "chromeWebSecurity" : false ,
    baseUrl : "https://preprod.cafes-pfaff.com",
    "specPattern": "**/*.cy.js" ,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});