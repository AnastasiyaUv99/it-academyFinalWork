import { expect } from 'chai';

const Header = require('../pageobjects/components/header');
const Basket = require('../pageobjects/basket');
const Catalog = require('../pageobjects/catalog');

const { urls } = require('../helpers/urls');
const { getTextArray, getPrices } = require('../helpers/stringFunctions');
const { basketNotifications } = require('../helpers/constants');

const header = new Header();
const basket = new Basket();
const catalog = new Catalog();

describe('working with Oz basket', () => {
  beforeEach(async () => {
    await basket.navigate(urls.catalog);  
  });
  
  afterEach(async () => {
    await basket.clearAppState(); 
  });
  
  it('should add selected products to basket when add-button is clicked', async () => {
    const productNamesInCatalog = await catalog.addProductsInBasket(2, header.basketButton);
    const allProductsIsInBasket = await basket.checkThatProductsIsInBasket(productNamesInCatalog);
    expect(allProductsIsInBasket).to.be.true;
  });

  it('should remove all products from basket', async () => {
    await catalog.addProductsInBasket(2, header.basketButton);
    await basket.removeProductsFromBasket();
    expect(await basket.emptyBasketText.getText()).to.equal(basketNotifications.emptyBasket);
  });

  it('should match total price value in basket with sum of individual product prices', async () => {
    await catalog.addProductsInBasket(2, header.basketButton);
    const prices = await getPrices(await getTextArray(await basket.productPrices));
    const sumOfTheProductPrices = prices.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const totalPrice = await getPrices(await basket.totalPriceOfProducts.getText());
    expect(sumOfTheProductPrices).to.equal(totalPrice);
  });

  it('should update total price when item quantity is changed in basket', async () => {
    await catalog.addProductsInBasket(1, header.basketButton);
    const totalPrice = await getPrices(await basket.totalPriceOfProducts.getText());
    await basket.changeAmountOfProducts(5);
    expect(await getPrices(await basket.totalPriceOfProducts.getText())).to.equal(totalPrice * 5);
  });


});
