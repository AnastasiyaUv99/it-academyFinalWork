import { expect } from 'chai';

const MainPage = require('../pageobjects/mainPage');
const Header = require('../pageobjects/components/header');
const Filter = require('../pageobjects/components/filter');
const Catalog = require('../pageobjects/catalog');
const { urls } = require('../helpers/urls');
const { search } = require('../helpers/constants');
const { getTextArray, getPrices } = require('../helpers/stringFunctions');

const mainPage = new MainPage();
const header = new Header();
const filter = new Filter();
const catalog = new Catalog();

describe('Oz search testing', () => {
  beforeEach(async () => {
    await header.navigate(urls.mainPage);
  });

  it('should display catalog of products if search is successful', async () => {
    await header.search(search.notebook, catalog.successSearchTitle);
    expect(await catalog.successSearchTitle.isDisplayed()).to.be.true;
  });

  it('should display error text if search is unsuccessful', async () => {
    await header.search(search.invalidText, catalog.unsuccessSearchText);
    expect(await catalog.unsuccessSearchText.isDisplayed()).to.be.true;
  });

  it('should perform search that filters products by price range', async () => {
    await header.search(search.notebook, catalog.successSearchTitle);
    await filter.setPriceRange(5, 20);
    const pricesInCatalog = await getPrices(await getTextArray(await catalog.prices));
    const sortedPricesInCatalog = pricesInCatalog.sort((a, b) => a - b);
    expect(sortedPricesInCatalog[0]).to.be.greaterThan(5);
    expect(sortedPricesInCatalog[sortedPricesInCatalog.length - 1]).to.be.lessThan(20);
  });

  it('should reset catalog to original view after removing price filter', async () => {
    await header.search(search.notebook, catalog.successSearchTitle);
    await filter.setPriceRange(5, 20);
    await header.pressElement(await filter.clearFilter);
    expect(await catalog.successSearchTitle.isDisplayed()).to.be.true;
  });

  it('should open catalog with bestsellers when bestsellers category on the main page is clicked ', async () => {
    await header.pressElement(await mainPage.bestsellersButton);
    expect(await browser.getUrl()).to.equal(urls.bestsellers);
  });

  it('should navigate to specific category in catalog page when banner button on the main page is clicked', async () => {
    const bannerText = await mainPage.goToCategorieFromBanner(7);
    const navigationChainText = await getTextArray(await catalog.navigationChain);
    const check = navigationChainText.some(item => item.includes(bannerText));
    expect(check).to.be.true;
  });
});
