const Base = require('./base');

class Catalog extends Base {
  constructor() {
    super();
  }

  get discountTags() {
    return $$('.badge-discount-primary');
  }

  get pricesWithDiscount() {
    return $$('.product-card__cost>.text-primary');
  }

  get previousPrices() {
    return $$('.d-inline-block');
  }

  get prices() {
    return $$('.product-card__cost b');
  }

  get products() {
    return $$('.link.product-card__link');
  }

  get addToBasketButtons() {
    return $$('.product-card__button');
  }

  get productsName() {
    return $$('.link.product-card__link');
  }

  get successSearchTitle() {
    return $('.landing-header__title');
  }

  get unsuccessSearchText() {
    return $('body .digi-title-alternative__wrapper');
  }

  get navigationChain() {
    return $$('.breadcrumbs__list__item');
  }

  get listOfProducts() {
    return $('.products_list');
  }

  get viewChangeButton() {
    return $('[data-value="list"]');
  }

  async addProductsInBasket(productQuantity, webElement) {
    const productNamesInCatalog = [];
    for (let i = 0; i < productQuantity; i++) {
      await this.pressElement(await this.addToBasketButtons[i]);
      const productName = await this.productsName[i].getText();
      productNamesInCatalog.push(productName);
    }
    await this.pressElement(await webElement);
    return productNamesInCatalog;
  }

  async openBasketByTwiceClicking(productNumber, webElement) {
    await this.pressElement(await this.addToBasketButtons[productNumber]);
    await this.waiters.waitForElementToBeVisible(await webElement);
    await this.pressElement(await this.addToBasketButtons[productNumber]);
  }

  async openProductPage(productNumber) {
    const itemNameInCatalog = await this.productsName[productNumber].getText();
    await this.pressElement(await this.products[productNumber]);
    return itemNameInCatalog;
  }
}

module.exports = Catalog;
