const { Base } = require('./base');

class LoginPage extends Base {
  constructor() {
    super();
  }
  get loginField() {
    return $('.form-control');
  }

  get enterButton() {
    return $('.btn.btn-lg.btn-primary.w-100.mt-3');
  }

  get errorMessage() {
    return $('div.alert.alert-error.fs-5.mb-2');
  }

  get smsCodeFieldOne() {
    return $('.otp-fieldset__input.form-control:first-of-type');
  }

  get smsCodeFieldTwo() {
    return $('.otp-fieldset__input.form-control:nth-of-type(2)');
  }

  get smsCodeFieldThr() {
    return $('.otp-fieldset__input.form-control:nth-of-type(3)');
  }

  get smsCodeFieldFour() {
    return $('.otp-fieldset__input.form-control:nth-of-type(4)');
  }

  get authorizationHelpPage() {
    return $('.link.link-muted[href="/help/assistant.phtml?l=i.auth.problem"]');
  }

  get authorizationHelpPageUrl() {
    return 'https://oz.by/help/assistant.phtml?l=i.auth.problem'
  }


  async loginWithPhoneNumber(telephoneNumber) {
    await this.loginField.setValue(telephoneNumber);
    await this.pressElement(this.enterButton);
  }

  async loginWithSmsCode(numOne, numTwo, numThr, numFour) {
    await this.smsCodeFieldOne.setValue(numOne);
    await this.smsCodeFieldTwo.setValue(numTwo);
    await this.smsCodeFieldThr.setValue(numThr);
    await this.smsCodeFieldFour.setValue(numFour);
    await this.pressElement(this.enterButton);
  }
}

module.exports = LoginPage;