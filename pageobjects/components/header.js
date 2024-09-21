const { Base } = require('../base');

class Header extends Base {
  constructor() {
    super();
  }

  get loginButton() {
    return $('[href="/personal/login.phtml?back_uri=https%3A%2F%2Foz.by%2F"]');
  }

  get searchField() {
    return $('#top-s');
  }

  get successSearchTitle() {
    return $('.landing-header__title');
  }

  get unsuccessSearchText() {
    return $('body .digi-title-alternative__wrapper');
  }

  get searchButton() {
    return $('.digi-ac-find__button');
  }






  async searching(item, condition) {
    await this.searchField.setValue(item);
    await this.pressElement(this.searchButton);
    await browser.waitUntil(async () => (await condition.isDisplayed()), {
      timeout: 10000,
    });
  }





}

module.exports = Header;