import { expect } from 'chai';

const MainPage = require('../pageobjects/mainPage');
const Header = require('../pageobjects/components/header');
const Cookie = require('../pageobjects/components/cookie');
const Filter = require('../pageobjects/components/filter');
const Catalog = require('../pageobjects/catalog')
const {urls} = require('../helpers/urls')
const { getTextArray, getSortedArrayOfPrices, fillText } = require('../helpers/functions')

const mainPage = new MainPage();
const header = new Header();
const cookie = new Cookie();
const filter = new Filter();
const catalog = new Catalog()



describe('Oz search testing', () => {
  beforeEach(async () => {
    await header.navigate(urls.mainPage);
    if (await cookie.cookieBanner.isDisplayed()) {
        await header.pressElement(await cookie.acceptCookieButton)
    }
  });

    it('displaying catalog of products if search is successful', async () => {
      await fillText(header.searchField, 'тетрадь', header.searchButton )
      await browser.waitUntil(async () => (await  catalog.successSearchTitle.isDisplayed()), {
      timeout: 10000,
      });
      expect(await catalog.successSearchTitle.isDisplayed()).to.be.true;
    });
  
    it('displaying error text if search is unsuccessful', async () => {
      await fillText(header.searchField, '4567890', header.searchButton )
      await browser.waitUntil(async () => (await  catalog.unsuccessSearchText.isDisplayed()), {
        timeout: 10000,
        });
      expect(await catalog.unsuccessSearchText.isDisplayed()).to.be.true;
    });

    it('performing a search with a price filter', async () => {
      await fillText(header.searchField, 'тетрадь', header.searchButton)
      await filter.setPriceRange(5, 20);
      await header.pressElement(await filter.applyFilterButton)
      const sortedArrayOfPricesInCatalog = await getSortedArrayOfPrices(catalog.prices)
      expect(sortedArrayOfPricesInCatalog[0]).to.be.greaterThan(5);
      expect(sortedArrayOfPricesInCatalog[sortedArrayOfPricesInCatalog.length - 1]).to.be.lessThan(20);
    });

    it('removing a product search filter', async () => {
      await fillText(header.searchField, 'тетрадь', header.searchButton)
      await filter.setPriceRange(5, 20);
      await header.pressElement(await filter.applyFilterButton)
      await header.pressElement(await filter.clearFilter)
      expect(await header.successSearchTitle.isDisplayed()).to.be.true
    })

    it('search filter of bestseller-categorie on the main page', async () => {
      await header.pressElement(await mainPage.bestsellersButton)
      const arrayOfItemTegs = await getTextArray(catalog.allTags)
      const countTegBestseller = arrayOfItemTegs.filter(item => item === 'Лидер продаж').length;
      const bestsellerAdvantage = countTegBestseller >= (arrayOfItemTegs.length * 0.46);
      expect(bestsellerAdvantage).to.be.true;
    })

    it('Categorie navigation from homepage banner', async () => {
        await header.pressElement(await mainPage.bannerCategory[0])
        const bannerText = await mainPage.bannerTitles[0].getText()
        await header.pressElement(await mainPage.bannerButtons[0])
        const navigationChainText = await getTextArray(catalog.navigationChain)
        const check = navigationChainText.some(item => item.includes(bannerText))
        expect(check).to.be.true;
    })
    
  });





