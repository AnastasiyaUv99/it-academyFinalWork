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

  get smsCodeField() {
    return $$('.otp-fieldset__input.form-control');
  }

  get loginHelpPageButton() {
    return $('.link.link-muted[href="/help/assistant.phtml?l=i.auth.problem"]');
  }

  async loginWithSmsCode(arr) {
    await this.smsCodeField[0].setValue(arr[0]);
    await this.smsCodeField[1].setValue(arr[1]);
    await this.smsCodeField[2].setValue(arr[2]);
    await this.smsCodeField[3].setValue(arr[3]);
    await this.pressElement(this.enterButton);
  }
}

module.exports = LoginPage;