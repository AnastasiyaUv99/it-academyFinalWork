const { Base } = require('../base');

class Cookie extends Base {
  constructor() {
    super();
  }

  get cookieBanner() {
    return $('#modalCookie');
  }

  get acceptCookieButton() {
    return $('.btn.btn-lg.btn-primary.w-100.m-0');
  }



}

module.exports = Cookie;