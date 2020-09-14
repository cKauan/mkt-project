const mongoose = require('mongoose');
const User = mongoose.model('Users');
exports.convertFormatNumberToDBNumber = (number) => {
    number = number.replace('.', '');
    number = number.replace(',', '.');
    return number;
}

exports.getGoogleAuthLoggedUserInfo = (user) => {
    return { name: user._json.name, picture: user._json.picture }
}

exports.getAwardedUsers = async () => {
    const users = await User.find();
    const loyalQtd = [];
    users.forEach((el) => {
        if (el.buy >= 500) {
            loyalQtd.push(el.buy)
        }
    })
    return [loyalQtd.length, users.length];
}
