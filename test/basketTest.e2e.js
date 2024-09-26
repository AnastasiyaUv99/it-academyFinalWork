import { expect } from 'chai';

const Header = require('../pageobjects/components/header');
const Cookie = require('../pageobjects/components/cookie');
const Basket = require('../pageobjects/basket')
const Catalog = require('../pageobjects/catalog')

const {urls} = require('../helpers/urls')
const { getTextArray, getSortedArrayOfPrices, getPrice } = require('../helpers/functions')
const { basketNotifications } = require('../helpers/constants')

const header = new Header();
const cookie = new Cookie();
const basket = new Basket()
const catalog = new Catalog()


describe('working with Oz basket', () => {
    beforeEach(async () => {
        await basket.navigate(urls.catalog); 
        if (await cookie.cookieBanner.isDisplayed()) {
            await basket.pressElement(await cookie.acceptCookieButton)
        }
      });

    it('adding items in basket', async () => {  
        await basket.pressElement(await catalog.addToBasketButtonArr[0]);
        await basket.pressElement(await catalog.addToBasketButtonArr[1])
        const itemsNamesInCatalog = await getTextArray(catalog.arrayOfItemsNames)
        await basket.pressElement(await header.basketButton);
        const itemsNamesInBasket = await getTextArray(basket.arrayOfItemsNames)
        const check = itemsNamesInBasket.some(item => item.includes(itemsNamesInCatalog[0])) && 
                      itemsNamesInBasket.some(item => item.includes(itemsNamesInCatalog[1]))
        expect(check).to.be.true;
    });

    it('deleting items from basket', async() => { 
        await basket.pressElement(await catalog.addToBasketButtonArr[0]);
        await basket.pressElement(await header.basketButton);
        await basket.deletionFromBasket()
        expect(await basket.emptyBasketTextLocator.getText()).to.equal(basketNotifications.emptyBasket)
    })

    it('checking the correct calculation of the total price in basket', async() => {
        await basket.pressElement(await catalog.addToBasketButtonArr[0]);
        await basket.pressElement(await catalog.addToBasketButtonArr[1]);
        await basket.navigate(urls.basket)
        const sortedArrayOfPrices = await getSortedArrayOfPrices(basket.arrayOfItemsPricesInBasket)
        const sumOfTheItemsPrices = sortedArrayOfPrices.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        const totalPrice = await getPrice(basket.totalPriceOfAllItems)
        expect(sumOfTheItemsPrices).to.equal(totalPrice)
    })

    it('Change item quantity from 1 to 5 in basket', async() => { 
        await basket.pressElement(await catalog.addToBasketButtonArr[0]);
        await basket.navigate(urls.basket);
        const totalPrice = await getPrice(basket.totalPriceOfAllItems)
        await basket.changingAmountOfItems(5)
        expect(await getPrice(basket.totalPriceOfAllItems)).to.equal(totalPrice * 5)
    })

    it('Open basket after clicking Add-to-cart-button twice', async() => { 
        await basket.pressElement(await catalog.addToBasketButtonArr[0])
        await browser.pause(1000); 
        await basket.pressElement(await catalog.addToBasketButtonArr[0])
        expect(await browser.getUrl()).to.equal(urls.basket)
    })


        it('checking the correct calculation of the total price in basket', async() => {
        await basket.pressElement(await catalog.addToBasketButtonArr[0]);
        await basket.pressElement(await catalog.addToBasketButtonArr[1]);
        await basket.navigate(urls.basket)
        const sortedArrayOfPrices = await getSortedArrayOfPrices(basket.arrayOfItemsPricesInBasket)
        const sumOfTheItemsPrices = sortedArrayOfPrices.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        const totalPrice = await getPrice(basket.totalPriceOfAllItems)
        console.log(totalPrice)
        expect(sumOfTheItemsPrices).to.equal(totalPrice)
    })


  });