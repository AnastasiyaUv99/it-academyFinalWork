import axios from 'axios'
import { expect } from 'chai';
import {Validator} from 'jsonschema'

const validator = new Validator()
import ozGetJsonSchema from '../data/ozGet.v1.json' assert { type: 'json' }
import ozGetJsonSchema2 from '../data/ozGet2.v1.json' assert { type: 'json' }

describe('Oz Get methods validations', ()  => {
    let response
    it ('should be status code 200 when pass valid data', async () => {       
        response = await axios.get('https://mc.yandex.ru/watch/1067243?wmode=7&page-url=https%3A%2F%2Foz.by%2Fcheckout%2F%23&page-ref=https%3A%2F%2Foz.by%2Fcheckout%2F&charset=utf-8&uah=chu%0A%22Google%20Chrome%22%3Bv%3D%22129%22%2C%22Not%3DA%3FBrand%22%3Bv%3D%228%22%2C%22Chromium%22%3Bv%3D%22129%22%0Acha%0Ax86%0Achb%0A64%0Achf%0A129.0.6668.59%0Achl%0A%22Google%20Chrome%22%3Bv%3D%22129.0.6668.59%22%2C%22Not%3DA%3FBrand%22%3Bv%3D%228.0.0.0%22%2C%22Chromium%22%3Bv%3D%22129.0.6668.59%22%0Achm%0A%3F0%0Achp%0AWindows%0Achv%0A10.0.0&browser-info=pv%3A1%3Avf%3Ac4o2nplw0qd8wcw40uon4r1yvz%3Afu%3A0%3Aen%3Autf-8%3Ala%3Aru-RU%3Av%3A1450%3Acn%3A1%3Adp%3A0%3Als%3A741940127172%3Ahid%3A203866663%3Az%3A180%3Ai%3A20240925085123%3Aet%3A1727243483%3Ac%3A1%3Arn%3A868338085%3Arqn%3A79%3Au%3A1727111274369365975%3Aw%3A1188x913%3As%3A1920x1080x24%3Ask%3A1%3Afp%3A951%3Awv%3A2%3Ads%3A0%2C0%2C555%2C1%2C3%2C0%2C%2C%2C%2C%2C%2C%2C%3Aco%3A0%3Acpf%3A1%3Antf%3A1%3Ans%3A1727243481844%3Agi%3AR0ExLjIuNDQ4MTkwNTMyLjE3MjcxMTEyNzQ%3D%3Aadb%3A2%3Arqnl%3A1%3Ast%3A1727243483%3At%3A%D0%9E%D1%84%D0%BE%D1%80%D0%BC%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%20OZ.by&t=gdpr(14)clc(0-0-0)rqnt(1)aw(1)rcm(0)cdl(na)eco(21561860)ti(1)' )
        expect(response.status).to.equal(200)
    })

    it ('should be appropriate json schema', async () => {       
        const result = await validator.validate(response.data, ozGetJsonSchema)
        expect(result.valid).to.be.true
    })

})

describe('Oz Get#2 methods validations', ()  => {
    let response
    it ('should be status code 200 when pass valid data', async () => {       
        response = await axios.get('https://api-maps.yandex.ru/services/coverage/v2?l=map&ll=27.559025570000006%2C53.90054922999648&z=6&lang=ru_RU' )
        expect(response.status).to.equal(200)
    })

    it ('should be appropriate json schema', async () => {       
        const result = await validator.validate(response.data, ozGetJsonSchema2)
        expect(result.valid).to.be.true
    })

})


describe('Oz Get#3 methods validations', ()  => {
    let response
    it ('should be status code 200 when pass valid data', async () => {       
        response = await axios.get('https://oz.by/js/suggest.v1727171138.js' )
        expect(response.status).to.equal(200)
    })

})