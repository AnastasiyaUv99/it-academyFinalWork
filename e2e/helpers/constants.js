const credentials = {
  invalid: {
    phoneNumber: 111111111,
  },
  validForSms: {
    phoneNumber: 291112111,
  },
};

const smsCode = {
  invalid: {
    smsCode: [1, 2, 3, 4],
  },
};

const search = {
  validText: 'тетрадь',
  invalidText: '4567890',
};

const loginNotifications = {
  wrongPhoneNumber: 'Введите корректный номер мобильного телефона',
  wrongSmsCode: 'Неверный код. Проверьте его на ошибки или отправьте код ещё раз',
};

const basketNotifications = {
  emptyBasket: 'В корзине пусто. Чтобы найти товары, используйте поиск или выберите товары из просмотренных ранее:',
};

const supportChat = {
  message: 'Здравствуйте',
  greeting: 'Здравствуйте! Я помощник OZ.\nВыберите тему вашего обращения ниже:',
};

const priceFilter = {
  minPrice: 5,
  maxPrice: 20,
}

module.exports = {
  credentials, loginNotifications, basketNotifications, supportChat, smsCode, search, priceFilter
};
