import { expect } from 'chai';

const MainPage = require('../pageobjects/mainPage');
const Header = require('../pageobjects/components/header');
const Cookie = require('../pageobjects/components/cookie');
const Basket = require('../pageobjects/basket')
const Filter = require('../pageobjects/components/filter');


const mainPage = new MainPage();
const header = new Header();
const cookie = new Cookie();
const basket = new Basket()
const filter = new Filter();




describe('working with Oz basket', () => {
    beforeEach(async () => {
        await basket.navigate('https://oz.by/books/?gcat=menu&location=%2F&label=menu_link_%D0%9A%D0%BD%D0%B8%D0%B3%D0%B8&href=%2Fbooks%2F'); //куда положить просто ссылку на каталог?
        if (await cookie.cookieBanner.isDisplayed()) {
            await basket.pressElement(await cookie.acceptCookieButton)
        }
      });

    it('adding items in basket', async () => {  
        await basket.pressElement(await basket.addToBasketButtonArr[0]);
        await basket.pressElement(await basket.addToBasketButtonArr[1])
        const itemsNamesInCatalog = await filter.getTextArray(basket.arrayOfItemsNamesInCatalog)
        await basket.pressElement(await basket.basketButton);
        const itemsNamesInBasket = await filter.getTextArray(basket.arrayOfItemsNamesInBasket)
        const check = itemsNamesInBasket.some(item => item.includes(itemsNamesInCatalog[0])) && 
                      itemsNamesInBasket.some(item => item.includes(itemsNamesInCatalog[1]))
        expect(check).to.be.true;
    });

    it('deleting items from basket', async() => { 
        await basket.pressElement(await basket.addToBasketButtonArr[0]);
        await basket.pressElement(await basket.basketButton);
        await basket.deletionFromBasket()
        expect(await basket.emptyBasketTextLocator.getText()).to.equal('В корзине пусто. Чтобы найти товары, используйте поиск или выберите товары из просмотренных ранее:')
    })

    it('checking the correct calculation of the total price in basket', async() => {
        await basket.pressElement(await basket.addToBasketButtonArr[0]);
        await basket.pressElement(await basket.addToBasketButtonArr[1]);
        await basket.navigate(basket.basketUrl)
        const arrayOfPrices = await filter.getTextArray(basket.arrayOfItemsPricesInBasket)
        const sortedArrayOfPrices = await filter.getSortedArrayOfPrices(arrayOfPrices)
        const sumOfTheItemsPrices = sortedArrayOfPrices.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        const totalPrice = await basket.getTotalPrice(basket.totalPriceOfAllItems)
        expect(sumOfTheItemsPrices).to.equal(totalPrice)
    })

    it('Change item quantity from 1 to 5 in basket', async() => { 
        await basket.pressElement(await basket.addToBasketButtonArr[0]);
        await basket.pressElement(await basket.basketButton);
        const totalPrice = await basket.getTotalPrice(basket.totalPriceOfAllItems)
        await basket.changingAmountOfItems()
        await browser.pause(1000) // без паузы падает
        const newTotalPrice = await basket.getTotalPrice(basket.totalPriceOfAllItems)
        expect(newTotalPrice).to.equal(totalPrice * 5)
    })


  });