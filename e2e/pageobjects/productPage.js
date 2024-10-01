const  Base  = require('./base');

class ProductPage extends Base {
  constructor() {
    super();
  }
  get pageTitle(){
    return $('.b-product-title__heading');
  }
}

module.exports = ProductPage;