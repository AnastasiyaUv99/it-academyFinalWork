import { expect } from 'chai';

const Footer = require('../pageobjects/components/footer');
const NewsPage = require('../pageobjects/newsPage');
const { urls } = require('../helpers/urls');
const { supportChat } = require('../helpers/constants');

const footer = new Footer();
const newsPage = new NewsPage();

describe('footer test functionality', () => {
  beforeEach(async () => {
    await footer.navigate(urls.mainPage);
  });

  it('should display greeting answer after sending a message in support chat', async () => {
    await footer.sendMessageToSupportChat(supportChat.message);
    expect(await footer.supportAnswer[0].getText()).to.equal(supportChat.greeting);
  });

  it('should open news page', async () => {
    await footer.pressElement(await footer.ozNewsButton);
    const newsText = await newsPage.chooseNewsToOpen(5);
    expect(newsText).to.equal(await newsPage.ozNewsTitle.getText());
  });

  it('should open download app page in new window when Google Play button is clicked', async () => {
    await footer.openAndSwitchToNewPage(await footer.googlePlayButton, urls.ozInGooglePlay);
    expect(await browser.getUrl()).to.equal(urls.ozInGooglePlay);
  });
});
