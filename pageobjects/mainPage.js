const { Base } = require('./base');

class MainPage extends Base {
  constructor() {
    super();
  }

  get bestsellersButton(){
    return $('[href="/books/bestsellers"]');
  }

  get bannerCategory(){
    return $$('.offers-slider__pagination__item');
  }

  get bannerButtons(){
    return $$('.offers-slider__item__btn');
  }

  get bannerTitles(){
    return $$('.offers-slider__item__main-title');
  }

  get promotionsAndDiscountsButton(){
    return $('[href="https://oz.by/sseries/more1502742.html"]');
}

}

module.exports = MainPage;