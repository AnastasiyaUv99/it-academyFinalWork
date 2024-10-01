const Waiters = require('./waiters');
const Cookie = require('./components/cookie');


class Base {
  constructor() {
    this.waiters = new Waiters(); 
    this.cookie = new Cookie();
}

    async navigate(url) {
      await browser.url(url);
      await this.waiters.waitForPageLoad()
      if (await this.cookie.cookieBanner.isDisplayed()) {
        await this.pressElement(await this.cookie.acceptCookieButton)
      }
    }
  
    async pressElement(webElement) {
      await this.waiters.waitForClickable(webElement)
      await webElement.click();
    }

    async openAndSwitchToNewPage(webElement, expectedUrl){
      await this.pressElement(webElement)
      await this.waiters.openNewPage()
      await this.waiters.waitForUrl(expectedUrl)
    }
    
  }




  module.exports =  Base ;