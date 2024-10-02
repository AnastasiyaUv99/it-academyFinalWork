const Base = require('../base');

class Footer extends Base {
  constructor() {
    super();
  }

  get googlePlayButton() {
    return $('[href="https://a.oz.by/?device=android&utm_source=mainsite&utm_medium=footer"]>.footer-full__oz-app-text');
  }

  get supportChatButton() {
    return $('.footer-full__nav-link[href="/help"]');
  }

  get openSupportChat() {
    return $('.webim-html-button-element.webim-html-button-main');
  }

  get messageField() {
    return $$('.webim-form-control>[placeholder="Сообщение"]');
  }

  get startDialogue() {
    return $$('[data-webim-widget-action="send-message"]');
  }

  get supportAnswer() {
    return $$('[data-webim-custom-style="messageAgent"]>[data-webim-model-field="text"]');
  }

  get ozNewsButton() {
    return $('[href="/about/history/"]');
  }

  async sendMessageToSupportChat(message) {
    await this.pressElement(await this.supportChatButton);
    await this.pressElement(await this.openSupportChat);
    await this.messageField[1].setValue(message);
    await this.pressElement(await this.startDialogue[1]);
    await this.waiters.waitForElementToBeVisible(this.supportAnswer[0]);
  }
}

module.exports = Footer;
