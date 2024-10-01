import axios from 'axios';
import { expect } from 'chai';

describe('Oz Post methods validations when update profile', () => {
  let response;
  it('should be status code 200 when update profile', async () => {
    response = await axios.post('https://oz.by/personal/profile');
    expect(response.status).to.equal(200);
  });
});
