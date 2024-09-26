
async function getTextArray(arr) {
    const elements = await arr
    const textArr = [];
    for (const element of elements) {
        const text = await element.getText(); 
        textArr.push(text); 
    }
    return textArr; 
}

async function getSortedArrayOfPrices(arr) {
    textArr = await getTextArray(arr)
    let priceArray = [];
    for (let i = 0; i<=textArr.length-1; i++) {
        const price = parseFloat(textArr[i].replace(' р.', '').replace(',', '.'))
        priceArray.push(price)
    }
    return priceArray.sort((a, b) => a - b)
}

async function getPrice(locator) {
    const totalPriceText = await locator.getText()
    return parseFloat(totalPriceText.replace(' р.', '').replace(',', '.'))
  }

async function getNumbersFromText(textOrTextArr) {
    if(Array.isArray(textOrTextArr)) {       
        const NumArr = [];
        for (const element of textOrTextArr) {
            const num = parseInt(element.match(/\d+/)); 
            if(!isNaN(num)) { NumArr.push(num)}; 
        } return NumArr
    } else {
        return parseInt(textOrTextArr.match(/\d+/));
    }
}

async function fillText(locator, text, button){
    await locator.setValue(text)
    await button.click()
  }





module.exports = { getTextArray, getSortedArrayOfPrices, getPrice, getNumbersFromText, fillText };