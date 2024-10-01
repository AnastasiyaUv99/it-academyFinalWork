import axios from 'axios';
import { expect } from 'chai';

describe('Oz Post methods validations when open a category page', () => {
  let response;
  it('should be status code 200 for the Toto product page on OZ.by', async () => {
    response = await axios.post('https://oz.by/producer/more12014004.html?c=1103251');
    expect(response.status).to.equal(200);
  });
});
