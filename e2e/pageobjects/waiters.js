class Waiters {

  async waitForClickable (webElement){
    await webElement.waitForClickable({
      timeout: 10000,
      timeoutMsg: 'Element is not clickable' ,
    });
  }

  async waitForPageLoad() {
    await browser.waitUntil(async () => {
      return (await browser.execute(() => document.readyState)) === 'complete';
    }, {
      timeout: 10000,
      timeoutMsg: 'The page did not load in 10 seconds',
    });
  }

  async openNewPage() {
    await browser.waitUntil(async () => { 
      const windowHandles = await browser.getWindowHandles();
      return windowHandles.length > 1; 
    }, {
        timeout: 5000,
        timeoutMsg: 'New page did not open'
    });
    const handles = await browser.getWindowHandles()
    await browser.switchToWindow(handles[1])
  }

  async waitForUrl(expectedUrl) {
    await browser.waitUntil(async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl === expectedUrl;
    }, {
        timeout: 10000,
        timeoutMsg: `URL didn't become ${expectedUrl} in 10 seconds`
    });
}

async waitForElementValueChange(webElement, oldValue) {
  await browser.waitUntil(async () => {
      const newValue = await webElement.getText();
      return newValue !== oldValue; 
  }, {
      timeout: 10000, 
      timeoutMsg: 'The value of the element has not changed in 10 seconds'
  });
}

async waitForElementToBeVisible(webElement) {
  await browser.waitUntil(async () => {
      const isDisplayed = await webElement.isDisplayed(); 
      return isDisplayed; 
  }, {
      timeout: 10000, 
      timeoutMsg: 'The element did not become visible within 10 seconds'
  });
}

}

module.exports = Waiters;










