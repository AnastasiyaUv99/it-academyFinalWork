class Base {
    async navigate(url) {
      await browser.url(url);
      await browser.waitUntil(async () => {
        return (await browser.execute(() => document.readyState)) === 'complete';
      }, {
        timeout: 10000, 
        timeoutMsg: 'Страница не загрузилась за 10 секунд'
      });
    }
  
    async pressElement(WebElement, timeout = 10000) {
      await WebElement.waitForClickable({
        timeout,
        timeoutMsg: `Element ${WebElement.selector} is not clickable after ${timeout}`,
      });
      await WebElement.click();
    }
    
    async waitingForNewPageLoad() {
      await browser.waitUntil(async () => { 
        const windowHandles = await browser.getWindowHandles();
        return windowHandles.length > 1; 
      }, {
          timeout: 5000,
          timeoutMsg: 'New Page is not load'
      });
    }



  
  }




  module.exports = { Base };