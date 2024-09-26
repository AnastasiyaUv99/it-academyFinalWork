import { expect } from 'chai';

const LoginPage = require('../pageobjects/loginPage');
const Header = require('../pageobjects/components/header');
const Cookie = require('../pageobjects/components/cookie');
const { urls } = require('../helpers/urls')
const { credentials, loginNotifications } = require('../helpers/constants')
const { fillText } = require('../helpers/functions')


const loginPage = new LoginPage();
const header = new Header();
const cookie = new Cookie();


describe('Oz Test Authorization', () => {
    beforeEach(async () => {
        await loginPage.navigate(urls.mainPage);
        if (await cookie.cookieBanner.isDisplayed()) {
            await loginPage.pressElement(await cookie.acceptCookieButton)
        }
        await loginPage.pressElement(await header.loginButton);
    });

    it('should be error message if mobile telephone is wrong', async () => { 
        await fillText(loginPage.loginField, credentials.invalid.phoneNumber, loginPage.enterButton)
        expect(await loginPage.errorMessage.getText()).to.equal(loginNotifications.wrongPhoneNumber);
    });

    it('should be error message if sms-code is wrong', async () => {
        await fillText(loginPage.loginField, credentials.valid.phoneNumber, loginPage.enterButton)
        await loginPage.loginWithSmsCode(credentials.invalid.smsCode);
        expect(await loginPage.errorMessage.getText()).to.equal(loginNotifications.wrongSmsCode);
    });

    it('opening the authorization help page', async () => {
        await loginPage.pressElement(await loginPage.loginHelpPageButton)
        await loginPage.openingNewPage()
        await browser.pause(1000);  //не работает без паузы, как можно исправить?
        expect(await browser.getUrl()).to.equal(urls.authorizationHelpPage);
        });

});

