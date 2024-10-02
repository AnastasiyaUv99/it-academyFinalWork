import { expect } from 'chai';

const Header = require('../pageobjects/components/header');
const Catalog = require('../pageobjects/catalog');
const MainPage = require('../pageobjects/mainPage');
const ProductPage = require('../pageobjects/productPage');
const { getPrices, getNumbersFromText } = require('../helpers/stringFunctions');
const { urls } = require('../helpers/urls');

const header = new Header();
const catalog = new Catalog();
const mainPage = new MainPage();
const productPage = new ProductPage();

describe('working with items', () => {
  beforeEach(async () => {
    await catalog.navigate(urls.mainPage);
    await catalog.pressElement(await mainPage.promotionsAndDiscountsButton);
  });

  it('should validate that current price is correct based on previous price and discount', async () => {
    const discount = await getNumbersFromText(await catalog.discountTags[0].getText());
    const priceWithDiscount = await getPrices(await catalog.pricesWithDiscount[0].getText());
    const previousPrice = await getPrices(await catalog.previousPrices[0].getText());
    expect(priceWithDiscount == (previousPrice - (previousPrice * discount * 0.01)).toFixed(2)).to.be.true;
  });

  it('should open product page after clicking on a product', async () => {
    const itemNameInCatalog = await catalog.openProductPage(2);
    const pageTitle = await productPage.pageTitle.getText();
    expect(itemNameInCatalog).to.equal(pageTitle);
  });

  it('should change catalog view from grid to list format', async () => {
    await catalog.pressElement(await catalog.viewChangeButton);
    expect(await catalog.listOfProducts.isDisplayed()).to.be.true;
  });

  it('should open basket page after clicking Add-to-cart-button twice', async () => {
    await catalog.openBasketByTwiceClicking(2, header.quantityOfProductsInBasket);
    expect(await browser.getUrl()).to.equal(urls.basket);
  });

});
