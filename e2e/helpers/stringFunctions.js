async function getTextArray(webElements) {
  const textArr = [];
  for (const element of webElements) {
    const text = await element.getText();
    textArr.push(text);
  }
  return textArr;
}

async function getPrices(textOrTextArr) {
  if (Array.isArray(textOrTextArr)) {
    const prices = [];
    for (let i = 0; i <= textOrTextArr.length - 1; i++) {
      const price = parseFloat(textOrTextArr[i].replace(' р.', '').replace(',', '.'));
      prices.push(price);
    } return prices;
  }
  return parseFloat(textOrTextArr.replace(' р.', '').replace(',', '.'));
}

async function getNumbersFromText(textOrTextArr) {
  if (Array.isArray(textOrTextArr)) {
    const numArr = [];
    for (const element of textOrTextArr) {
      const num = parseInt(element.match(/\d+/));
      if (!isNaN(num)) { numArr.push(num); }
    } return numArr;
  }
  return parseInt(textOrTextArr.match(/\d+/));
}

module.exports = { getTextArray, getPrices, getNumbersFromText };
