import axios from 'axios';
import { expect } from 'chai';

describe('Oz Get methods validations when work with basket', () => {
  let response;
  it('should be status code 200 when add product to basket', async () => {
    response = await axios.get('https://oz.by/goods/ajax/html_box.php?idGoods=101158087&type=html');
    expect(response.status).to.equal(200);
  });

  it('should be status code 200 when open basket', async () => {
    response = await axios.get('https://oz.by/checkout/');
    expect(response.status).to.equal(200);
  });
});
