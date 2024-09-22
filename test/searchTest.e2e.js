import { expect } from 'chai';

const MainPage = require('../pageobjects/mainPage');
const Header = require('../pageobjects/components/header');
const Cookie = require('../pageobjects/components/cookie');
const Filter = require('../pageobjects/components/filter');

const mainPage = new MainPage();
const header = new Header();
const cookie = new Cookie();
const filter = new Filter();



describe('Oz search testing', () => {
  beforeEach(async () => {
    await mainPage.navigate(mainPage.mainPageUrl);
    if (await cookie.cookieBanner.isDisplayed()) {
        await header.pressElement(await cookie.acceptCookieButton)
    }
  });

    it('displaying catalog of products if search is successful', async () => {
      await header.searching('тетрадь', header.successSearchTitle);
      expect(await header.successSearchTitle.isDisplayed()).to.be.true;
    });
  
    it('displaying error text if search is unsuccessful', async () => {
      await header.searching('4567890', header.unsuccessSearchText);
      expect(await header.unsuccessSearchText.isDisplayed()).to.be.true;
    });

    it('performing a search with a price filter', async () => {
      await header.searching('тетрадь', header.successSearchTitle);
      await filter.setPriceRange(5, 20);
      await header.pressElement(await filter.applyFilterButton)
      const arrayOfPricesInCatalog = await filter.getTextArray(filter.locatorsOfPricesInCatalog)
      const sortedArrayOfPricesInCatalog = await filter.getSortedArrayOfPrices(arrayOfPricesInCatalog)
      expect(sortedArrayOfPricesInCatalog[0]).to.be.greaterThan(5);
      expect(sortedArrayOfPricesInCatalog[sortedArrayOfPricesInCatalog.length - 1]).to.be.lessThan(20);
    });

    it('removing a product search filter', async () => {
      await header.searching('тетрадь', header.successSearchTitle);
      await filter.setPriceRange(5, 20);
      await header.pressElement(await filter.applyFilterButton)
      await header.pressElement(await filter.clearFilter)
      expect(await header.successSearchTitle.isDisplayed()).to.be.true
    })



    /* В тесте ниже я хотела проверить что после клика на кнопку бестселлеры, все товары в каталоге будут иметь тег "лидер продаж". 
    Для этого я собираю массив из всех тегов товаров в категории бестселлеры. Но все усложняет то, что кроме  тега "лидер продаж" есть и другие (иногда несколько) и то, 
    что на последних страницах они вообще могли не поставить тег "лидер продаж". Поэтому если проверять по каждому отдельному товару наличие тега "лидер продаж" то тест упадет, 
    можно только по соотношению количества тега лидер продаж относительно всех остальных тегов. Нормально ли это, и то что процент все равно меньше 50?
    */
    it('search filter of bestseller-categorie on the main page', async () => {
      await header.pressElement(await filter.bestsellersButton)
      const arrayOfItemTegs = await filter.getTextArray(filter.itemTegs)
      const countTegBestseller = arrayOfItemTegs.filter(item => item === 'Лидер продаж').length;
      const bestsellerAdvantage = countTegBestseller >= (arrayOfItemTegs.length * 0.46);
      expect(bestsellerAdvantage).to.be.true;
    })


    
    it('Catalog navigation from homepage banner', async () => {
        await header.pressElement(await filter.stationeryLocator)
        await header.pressElement(await filter.bannerButton)
        const navigationChainText = await filter.getTextArray(filter.navigationChain)
        const check = navigationChainText.some(item => item.includes('Канцелярские товары'))
        expect(check).to.be.true;
    })
    
    

  });





