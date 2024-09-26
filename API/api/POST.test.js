import axios from 'axios'
import { expect } from 'chai';
import {Validator} from 'jsonschema'
import ozPostJsonSchema from '../data/ozPost.v1.json' assert { type: 'json' }

const validator = new Validator()


describe('Oz Post methods validations', () => {
    let response
    it('should be status code 200 when pass valid data', async () => {
        response = await axios.post('https://oz.by/producer/more12014004.html?c=1103251', {
            "count": 12,
            "text": "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c 12 \u0442\u043e\u0432\u0430\u0440\u043e\u0432",
            "static_url": "",
            "static_url_params": ""
        })
        expect(response.status).to.equal(200)
    })
})


describe('Oz Post methods validations', () => {
    let response
    it('should be status code 200 when pass valid data', async () => {
        response = await axios.post('https://oz.by/checkout/google_data.php') 
        expect(response.status).to.equal(200)
    })
    it ('should be appropriate json schema', async () => {       
        const result = validator.validate(response.data, ozPostJsonSchema)
        expect(result.valid).to.be.true
    })
})