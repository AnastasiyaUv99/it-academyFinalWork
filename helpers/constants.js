
const credentials = {
    invalid: {
        phoneNumber: 111111111,
        smsCode: [1, 2, 3, 4]
    },
    valid: {
        phoneNumber: 291112111,
    }
}

const loginNotifications = {
    wrongPhoneNumber: 'Введите корректный номер мобильного телефона',
    wrongSmsCode: 'Неверный код. Проверьте его на ошибки или отправьте код ещё раз'
}

const basketNotifications = {
    emptyBasket: 'В корзине пусто. Чтобы найти товары, используйте поиск или выберите товары из просмотренных ранее:'
}

const supportChatAnswers = {
    greeting: 'Здравствуйте! Я помощник OZ.\nВыберите тему вашего обращения ниже:'
}


module.exports = {credentials, loginNotifications, basketNotifications, supportChatAnswers };