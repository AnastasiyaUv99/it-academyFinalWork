const Base  = require('../base');

class Header extends Base {
  constructor() {
    super();
  }

  get loginButton() {
    return $('.link.user-bar__item[href="#"]');
  }

  get searchField() {
    return $('#top-s');
  }

  get searchButton() {
    return $('.digi-ac-find__button');
  }

  get basketButton() {
    return $('.link.user-bar__item.user-bar__cart');
  }

  get quantityOfProductsInBasket() {
    return $('[id="cart-count"]');
  }

  async search(text, webElement){
    await this.searchField.setValue(text)
    await this.searchButton.click()
    await this.waiters.waitForElementToBeVisible(webElement)
  }
  
}

module.exports = Header;