const { Base } = require('./base');

class Catalog extends Base {
  constructor() {
    super();
  }

  get bookPromotions(){
    return $('[href="https://oz.by/sseries/more1502742.html?c=1101523&availability=1;2"]>div>.landing-nav-list__title');
  }

  get allTags (){
    return $$('.product-card__row');
  }

  get discountTegs(){
    return $$('.badge-discount-primary');
  }

  get pricesWithDiscount(){
    return $$('.product-card__cost>.text-primary');
  }

  get previousPrices(){
    return $$('.d-inline-block');
  }

  get prices() {
    return $$('.product-card__cost b');
  }

  get arrayOfItems(){
    return $$('.link.product-card__link');
  }

  get titleOnTheItemPage(){
    return $('.b-product-title__heading');
  }

  get addToBasketButtonArr() {
    return $$('.product-card__button');
  }

  get arrayOfItemsNames() {
    return $$('.link.product-card__link');
  }

  get successSearchTitle() {
    return $('.landing-header__title');
  }

  get unsuccessSearchText() {
    return $('body .digi-title-alternative__wrapper');
  }
  
  get navigationChain(){
    return $$('.breadcrumbs__list__item');
}

}

module.exports = Catalog;