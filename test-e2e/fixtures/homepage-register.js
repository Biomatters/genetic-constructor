var registerViaHomepage = function(browser) {

  browser
    .url('http://localhost:3001/homepage')
    // wait for homepage to be present before starting
    .waitForElementPresent('.homepage', 5000, 'Expected homepage element to be present')
    // open sign in dialog
    .click('.homepage-getstarted')
    // allow transition to complete
    .pause(1000)
    // wait for it to be present
    .waitForElementPresent('#auth-signin', 5000, 'Expected form to become visible')
    // ensure it is the sign in dialog
    .getText('#auth-signin .title', function(result) {
      browser.assert.equal(result.value, "Sign In")
    })
    // click the a tag that switches to registration
    .click('#auth-signin a:nth-of-type(1)')
    // wait for registration dialog to appear
    .waitForElementPresent('#auth-signup', 5000, 'Expected form to become visible')
    // submit with no values to ensure errors appear
    .submitForm('#auth-signup')
    .pause(1000)
    // expect 6 errors to appear ( name error, two email errors, two password erros TOS error )
    .assert.countelements('.error.visible', 6);
    // create fields with viable values including a random email
  var email = new Date().getTime() + '@hotmail.com';
  var password = '123456';
  var firstName = 'George';
  var lastName = 'Washington';

  browser
    .clearValue('#auth-signup input:nth-of-type(1)')
    .clearValue('#auth-signup input:nth-of-type(2)')
    .clearValue('#auth-signup input:nth-of-type(3)')
    .clearValue('#auth-signup input:nth-of-type(4)')
    .clearValue('#auth-signup input:nth-of-type(5)')
    .clearValue('#auth-signup input:nth-of-type(6)')

    .setValue('#auth-signup input:nth-of-type(1)', firstName)
    .setValue('#auth-signup input:nth-of-type(2)', lastName)
    .setValue('#auth-signup input:nth-of-type(3)', email)
    .setValue('#auth-signup input:nth-of-type(4)', email)
    .setValue('#auth-signup input:nth-of-type(5)', password)
    .setValue('#auth-signup input:nth-of-type(6)', password)
    .click('.checkbox input')
    .submitForm('#auth-signup')
    .waitForElementNotPresent('#auth-signup', 5000, 'expected form to be dimmissed')
    .waitForElementPresent('.userwidget', 5000, 'expected to land on page with the user widget visible')

  return {email, password, firstName, lastName};

}

module.exports = registerViaHomepage;
