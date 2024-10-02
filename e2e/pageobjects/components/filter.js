const Base = require('../base');

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

  get clearFilter() {
    return $('.top-filters__sqcheckers__clear');
  }

  async setPriceRange(minPrice, maxPrice) {
    await this.minPriceField.setValue(minPrice);
    await this.maxPriceField.setValue(maxPrice);
    await this.pressElement(await this.applyFilterButton);
  }
}

module.exports = Filter;
