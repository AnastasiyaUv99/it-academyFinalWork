const Base = require('./base');
const { getTextArray } = require('../helpers/stringFunctions');

class Basket extends Base {
  constructor() {
    super();
  }

  get productsName() {
    return $$('.goods-table-cell__link');
  }

  get selectProductsInBasketButtons() {
    return $$('.i-checkbox.i-checkbox_large');
  }

  get removeButton() {
    return $('.i-button.i-button_danger.i-button_small.remove');
  }

  get confirmRemoveButton() {
    return $('.i-button.i-button_danger.i-button_small.remove-yes');
  }

  get emptyBasketText() {
    return $('.i-textual__plain.i-textual__plain_limited');
  }

  get productPrices() {
    return $$('.goods-table__cell_third>div>div>.goods-table-cell__line_price');
  }

  get totalPriceOfProducts() {
    return $('.deal-form-footer__line_price');
  }

  get сurrentProductQuantity() {
    return $('.i-amount-select__key');
  }

  get productQuantities() {
    return $$('.i-amount-select__item');
  }

  async checkThatProductsIsInBasket(productNamesInCatalog) {
    const productNamesInBasket = await getTextArray(await this.productsName);
    const allProductsIsInBasket = productNamesInCatalog.every(catalogProduct => productNamesInBasket.some(basketProduct => basketProduct.includes(catalogProduct)));
    return allProductsIsInBasket;
  }

  async removeProductsFromBasket() {
    await this.pressElement(await this.selectProductsInBasketButtons[await this.selectProductsInBasketButtons.length - 1]);
    await this.waiters.waitForPageLoad()
    await this.pressElement(await this.removeButton);
    await this.pressElement(await this.confirmRemoveButton);
  }

  async changeAmountOfProducts(quantity) {
    const oldValue = await this.totalPriceOfProducts.getText();
    await this.pressElement(await this.сurrentProductQuantity);
    await this.pressElement(await this.productQuantities[quantity - 1]);
    await this.waiters.waitForElementValueChange(this.totalPriceOfProducts, oldValue);
  }
}

module.exports = Basket;
