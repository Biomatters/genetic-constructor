var homepageRegister = require('../fixtures/homepage-register');
var openInventory = require('../fixtures/open-inventory');
var newProject = require('../fixtures/newproject');
var myProjects = require('../fixtures/myprojects');
var openTemplatesSample = require('../fixtures/open-templates-sample.js');
var dragFromTo = require('../fixtures/dragfromto.js');

module.exports = {
  'Verify we can order all templates' : function (browser) {

    // maximize for graphical tests
    browser.windowSize('current', 2000, 1100);
    homepageRegister(browser);
    // example the templates sample project
    openTemplatesSample(browser);
    // start a new project
    newProject(browser);
    // drag the first template into the new project
    dragFromTo(browser, '.InventoryItem-item', 10, 10, '.cvc-drop-target', 10, 10);

    // open the order form
    browser
      .waitForElementPresent('.order-button', 5000, 'expected order button to be available')
      .click('.order-button')
      .waitForElementPresent('.order-form .page1', 10000, 'expected order dialog to appear')
      .pause(1000)
      .submitForm('.order-form')
      .waitForElementPresent('.order-form .page3', 120000, 'expect summary page to appear')
      // click done
      .click('.order-form button:nth-of-type(1)')
      .waitForElementNotPresent('.order-form', 10000, 'expected order dialog to go away')
      .end();
  }
};
