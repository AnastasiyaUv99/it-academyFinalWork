const { Base } = require('./base');

class Basket extends Base {
  constructor() {
    super();
  }

  get arrayOfItemsNames() {
    return $$('.goods-table-cell__link');
  }

  get selectItemsInBasketButton() {
    return $$('.i-checkbox.i-checkbox_large');
  }

  get deleteButton() {
    return $('.i-button.i-button_danger.i-button_small.remove');
  }

  get confirmDeletingButton() {
    return $('.i-button.i-button_danger.i-button_small.remove-yes');
  }

  get emptyBasketTextLocator() {
    return $('.i-textual__plain.i-textual__plain_limited');
  }

  get arrayOfItemsPricesInBasket() {
    return $$('.goods-table__cell_third>div>div>.goods-table-cell__line');
  }

  get totalPriceOfAllItems() {
    return $('.deal-form-footer__line_price');
  }

  get amountOfItems() {
    return $('.i-amount-select__key');
  }

  get quantitySelectors() {
    return $$('.i-amount-select__item');
  }


  async deletionFromBasket() {
    await this.pressElement(await this.selectItemsInBasketButton[await this.selectItemsInBasketButton.length - 1])
    await browser.waitUntil(async () => { return (await browser.execute(() => document.readyState)) === 'complete';}, {
      timeout: 10000, 
      timeoutMsg: ''
    });
    await this.pressElement(await this.deleteButton)
    await this.pressElement(await this.confirmDeletingButton)
  }

  async changingAmountOfItems(quantity) {
    await this.pressElement(await this.amountOfItems)
    await this.pressElement(await this.quantitySelectors[quantity - 1])
    await browser.pause(1000) 
  }

  
}

module.exports = Basket;