const { Base } = require('../base');

class Header extends Base {
  constructor() {
    super();
  }

  get loginButton() {
    return $('.link.user-bar__item[href="#"]');
  }

  get searchField() {
    return $('#top-s');
  }

  get searchButton() {
    return $('.digi-ac-find__button');
  }

  get basketButton() {
    return $('.link.user-bar__item.user-bar__cart');
  }

}

module.exports = Header;