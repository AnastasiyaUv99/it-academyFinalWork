import { expect } from 'chai';

const MainPage = require('../pageobjects/mainPage');
const LoginPage = require('../pageobjects/loginPage');
const Header = require('../pageobjects/components/header');
const Cookie = require('../pageobjects/components/cookie');

const mainPage = new MainPage();
const loginPage = new LoginPage();
const header = new Header();
const cookie = new Cookie();

describe('Oz Test Authorization', () => {
    beforeEach(async () => {
        await mainPage.navigate(mainPage.mainPageUrl);
        if (await cookie.cookieBanner.isDisplayed()) {
            await header.pressElement(await cookie.acceptCookieButton)
        }
    });

    it('should be error message if mobile telephone is wrong', async () => {
        await header.pressElement(await header.loginButton);
        await loginPage.loginWithPhoneNumber(111111111);
        expect(await loginPage.errorMessage.getText()).to.equal('Введите корректный номер мобильного телефона');
    });

    it('should be error message if sms-code is wrong', async () => {
        await header.pressElement(await header.loginButton);
        await loginPage.loginWithPhoneNumber(291111121);
        await loginPage.loginWithSmsCode(1, 2, 3, 4);
        expect(await loginPage.errorMessage.getText()).to.equal('Неверный код. Проверьте его на ошибки или отправьте код ещё раз');
    });

    it('opening the authorization help page', async () => {
        await header.pressElement(await header.loginButton);
        await header.pressElement(await loginPage.authorizationHelpPage)
        await header.waitingForNewPageLoad()
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1])
        await browser.pause(1000);  //не работает без паузы, как можно исправить?
        expect(await browser.getUrl()).to.equal( loginPage.authorizationHelpPageUrl);
        });

});

