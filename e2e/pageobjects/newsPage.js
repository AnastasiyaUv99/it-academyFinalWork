const Base = require('./base');

class NewsPage extends Base {
  constructor() {
    super();
  }
  get ozNewsList() {
    return $$('.briefly-history>li>p>a');
  }

  get ozNewsTitle() {
    return $('.longcol>h1');
  }

  async chooseNewsToOpen(newsNumber) {
    const newsText = await this.ozNewsList[newsNumber].getText();
    await this.pressElement(await this.ozNewsList[newsNumber]);
    return newsText;
  }
}

module.exports = NewsPage;
