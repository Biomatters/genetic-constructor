var homepageRegister = require('../fixtures/homepage-register');
var openInventory = require('../fixtures/open-inventory');
var newProject = require('../fixtures/newproject');
var myProjects = require('../fixtures/myprojects');
var openTemplatesSample = require('../fixtures/open-templates-sample.js');

module.exports = {
  'Open the templates sample project' : function (browser) {

    // maximize for graphical tests
    browser.windowSize('current', 2000, 1100);
    homepageRegister(browser);
    openTemplatesSample(browser);
    browser
      .saveScreenshot('./test-e2e/current-screenshots/templates-open.png')
      .end();
  }
};
