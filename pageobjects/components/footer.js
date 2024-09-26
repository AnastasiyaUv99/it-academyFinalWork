const { Base } = require('../base');

class Footer extends Base {
  constructor() {
    super();
  }

  get googlePlayButton() {
    return $('[href="https://a.oz.by/?device=android&utm_source=mainsite&utm_medium=footer"]>.footer-full__oz-app-text');
  }

  get ozInGooglePlayUrl() {
    return 'https://play.google.com/store/apps/details?id=by.oz.android&referrer=utm_source%3Dmainsite%26utm_medium%3Dfooter%26utm_campaign%3D';
  }

  get ozShopsButton() {
    return $('.footer-full__nav-link[href="/store/"]');
  }
  
  get ozShopInBaranovichi() {
    return $$('[href="#baranovichi"]>.city-nav__title');
  }
  
  get goToTheShopButton() {
    return $$('[href="/store/more37.html"]');
  }

  get shopTitle() {
    return $('.place-info__title.fw-bold');
  }

  get supportChatButton() {
    return $('.footer-full__nav-link[href="/help"]');
  }

  get openSupportChat(){
    return $('.webim-html-button-element.webim-html-button-main')
  }

  get messageField(){
    return $$('.webim-form-control>[placeholder="Сообщение"]')
  }

  get startDialogue(){
    return $$('[data-webim-widget-action="send-message"]')
  }

  get supportAnswer(){
    return $$('[data-webim-custom-style="messageAgent"]>[data-webim-model-field="text"]')
  }

}

module.exports = Footer;