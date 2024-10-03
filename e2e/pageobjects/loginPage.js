const Base = require('./base');

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

  get smsCodeFields() {
    return $$('.otp-fieldset__input.form-control');
  }

  get loginHelpPageButton() {
    return $('.link.link-muted[href="/help/assistant.phtml?l=i.auth.problem"]');
  }

  async login(telephoneNumber, smsCode) {
    await this.loginField.setValue(telephoneNumber);
    await this.pressElement(this.enterButton);
    for (let i = 0; i < await this.smsCodeFields.length; i++) {
      await this.smsCodeFields[i].setValue(smsCode[0]);
    }
    await this.pressElement(this.enterButton);
  }
}

module.exports = LoginPage;
