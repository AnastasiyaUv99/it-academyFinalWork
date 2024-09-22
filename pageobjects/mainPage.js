const { Base } = require('./base');

class MainPage extends Base {
  constructor() {
    super();
  }

  get mainPageUrl() {
    return 'https://oz.by/';
  }


}

module.exports = MainPage;