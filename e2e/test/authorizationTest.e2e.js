import { expect } from 'chai';

const LoginPage = require('../pageobjects/loginPage');
const Header = require('../pageobjects/components/header');
const { urls } = require('../helpers/urls');
const { credentials, loginNotifications, smsCode } = require('../helpers/constants');

const loginPage = new LoginPage();
const header = new Header();

describe('Oz Test Authorization', () => {
  beforeEach(async () => {
    await loginPage.navigate(urls.mainPage);
    await loginPage.pressElement(await header.loginButton);
  });

  it('should be error message if mobile telephone is wrong', async () => {
    await loginPage.login(credentials.invalid.phoneNumber);
    expect(await loginPage.errorMessage.getText()).to.equal(loginNotifications.wrongPhoneNumber);
  });

  it('should be error message if sms-code is wrong', async () => {
    await loginPage.login(credentials.validForSms.phoneNumber, smsCode.invalid.smsCode);
    expect(await loginPage.errorMessage.getText()).to.equal(loginNotifications.wrongSmsCode);
  });

  it('should open help page in new window when help button is clicked', async () => {
    await loginPage.openAndSwitchToNewPage(await loginPage.loginHelpPageButton, urls.authorizationHelpPage);
    expect(await browser.getUrl()).to.equal(urls.authorizationHelpPage);
  });
});
