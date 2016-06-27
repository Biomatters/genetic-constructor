var homepageRegister = require('../fixtures/homepage-register');
var openInventory = require('../fixtures/open-inventory');
var newProject = require('../fixtures/newproject');
var myProjects = require('../fixtures/myprojects');

module.exports = {
  'Create a project from one of the templates' : function (browser) {

    // maximize for graphical tests
    browser.windowSize('current', 2000, 1100);
    homepageRegister(browser);
    newProject(browser);
    myProjects(browser);
    browser
    browser.elements('css selector', '[data-inventory~="project"]', function (resultValues) {
      resultValues.value.forEach(function(element) {
        browser.elementIdText(element.ELEMENT, function (result) {
          if(result.value === 'EGF Sample Templates') {
            browser.moveTo(element.ELEMENT, 0,0 , function () {
              browser.elementIdClick(element.ELEMENT, function (clicked) {
                browser
                  .pause(5000)
                  .assert.countelements('.construct-viewer', 29)
                  .saveScreenshot('./test-e2e/current-screenshots/templates-open.png')
                  .end();
              });
            });
          }
        });
      });
    });
  }
};
