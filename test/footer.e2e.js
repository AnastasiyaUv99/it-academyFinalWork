import { expect } from 'chai';

const Cookie = require('../pageobjects/components/cookie');
const Footer = require('../pageobjects/components/footer')
const { urls } = require('../helpers/urls')
const { supportChatAnswers } = require('../helpers/constants')
const { fillText } = require('../helpers/functions')

const cookie = new Cookie();
const footer = new Footer()

describe('footer test functionality', () => {
    beforeEach(async () => {
        await footer.navigate(urls.mainPage);
        if (await cookie.cookieBanner.isDisplayed()) {
            await footer.pressElement(await cookie.acceptCookieButton)
        }
    });

    it('google play download app page navigation test', async () => {
        await footer.pressElement(await footer.googlePlayButton);   
        await footer.openingNewPage()
        await browser.pause(1000)
        expect(await browser.getUrl()).to.equal(footer.ozInGooglePlayUrl)
    });

    it('Oz shop in Baranovichi', async () => {
        await footer.pressElement(await footer.ozShopsButton)
        await footer.pressElement(await footer.ozShopInBaranovichi[1])
        await footer.pressElement(await footer.goToTheShopButton[1])
        expect(await footer.shopTitle.getText()).to.equal('Барановичи')
    })

    it('correct work of support chat', async () => {
        await footer.pressElement(await footer.supportChatButton)
        await footer.pressElement(await footer.openSupportChat)
        await fillText(footer.messageField[1], 'Hello', footer.startDialogue[1])
        await footer.supportAnswer[0].isDisplayed({
            timeout: 10000,
            timeoutMsg: `Element footer.supportAnswer is not displayed`,
          });
        expect(await footer.supportAnswer[0].getText()).to.equal(supportChatAnswers.greeting)
    })

})