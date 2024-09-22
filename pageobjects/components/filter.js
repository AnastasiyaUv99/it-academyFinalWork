const { Base } = require('../base');

class Filter extends Base {
  constructor() {
    super();
  }

    get minPriceField() {
        return $('#inp1_r_cost');
    }

    get maxPriceField() {
        return $('#inp2_r_cost');
    }

    get applyFilterButton() {
        return $('.filters__searchbtn__btn');
    }

    get locatorsOfPricesInCatalog() {
        return $$('.product-card__cost b');
    }

    get clearFilter() {
        return $('.top-filters__sqcheckers__clear');
    }

    get bestsellersButton(){
        return $('[href="/books/bestsellers"]');
    }

    get stationeryLocator(){
        return $('[href="#5"]');
    }

    get bannerButton(){
        return $('[href="https://oz.by/sseries/more1501068.html?c=1102091"]>div>div>.offers-slider__item__btn-wrap');
    }

    get navigationChain(){
        return $$('.breadcrumbs__list__item');
    }

    get itemTegs(){
        return $$('.product-card__row');
    }


    async setPriceRange(minPrice, maxPrice) {
        await this.minPriceField.setValue(minPrice)
        await this.maxPriceField.setValue(maxPrice)
    }

    async getTextArray(arr) {
        const elements = await arr
        const textArr = [];
        for (const element of elements) {
            const text = await element.getText(); 
            textArr.push(text); 
        }
        return textArr; 
    }

    async getSortedArrayOfPrices(arr) {
        let priceArray = [];
        for (let i = 0; i<=arr.length-1; i++) {
            const price = parseFloat(arr[i].replace(' р.', '').replace(',', '.'))
            priceArray.push(price)
        }
        return priceArray.sort((a, b) => a - b)
    }

}



module.exports = Filter;