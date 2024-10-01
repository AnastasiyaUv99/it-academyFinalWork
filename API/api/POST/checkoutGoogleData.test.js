import axios from 'axios';
import { expect } from 'chai';
import { Validator } from 'jsonschema';
import ozPostJsonSchema from '../../data/ozPost.v1.json' assert { type: 'json' }

const validator = new Validator();

describe('Oz Post methods validations when checkout google data', () => {
  let response;
  it('should be status code 200 when pass valid data', async () => {
    response = await axios.post('https://oz.by/checkout/google_data.php');
    expect(response.status).to.equal(200);
  });
  it('should be appropriate json schema', async () => {
    const result = validator.validate(response.data, ozPostJsonSchema);
    expect(result.valid).to.be.true;
  });
});
