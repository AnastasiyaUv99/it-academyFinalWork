import { expect } from 'chai';

const Cookie = require('../pageobjects/components/cookie');
const Catalog = require('../pageobjects/catalog')
const MainPage = require('../pageobjects/mainPage');
const { getTextArray, getPrice, getNumbersFromText } = require('../helpers/functions')
const {urls} = require('../helpers/urls')

const cookie = new Cookie();
const catalog = new Catalog()
const mainPage = new MainPage();


describe('working with items', () => {
    beforeEach(async () => {
        await catalog.navigate(urls.mainPage)
        if (await cookie.cookieBanner.isDisplayed()) {
            await catalog.pressElement(await cookie.acceptCookieButton)
        }
        await catalog.pressElement(await mainPage.promotionsAndDiscountsButton);      
        await catalog.pressElement(await catalog.bookPromotions); 
    });

    it('checking promotions and discounts', async () => {
        const discount = await getNumbersFromText(await catalog.bookPromotions.getText())
        const discountTegs = await getNumbersFromText(await getTextArray(catalog.discountTegs))   
        expect(discountTegs.every( (currentValue) => currentValue < discount)).to.be.true
    });

    it('checking the correct discount calculation', async () => {
        const discount = await getNumbersFromText(await catalog.discountTegs[0].getText())
        const priceWithDiscount = await getPrice(catalog.pricesWithDiscount[0])
        const previousPrice = await getPrice(catalog.previousPrices[0])
        expect(priceWithDiscount == (previousPrice-(previousPrice*discount*0.01)).toFixed(2)).to.be.true
    })

    it('opening a product card', async () => {
        const itemNameInCatalog = await catalog.arrayOfItemsNames[0].getText()
        await catalog.pressElement(await catalog.arrayOfItems[0])
        const titleOnTheItemPage = await catalog.titleOnTheItemPage.getText()
        expect(itemNameInCatalog).to.equal(titleOnTheItemPage)
    })

})