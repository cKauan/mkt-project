const mongoose = require('mongoose');
const User = mongoose.model('Users');
const userName = "Carlos Kauãn";

module.exports = {

    async main(req, res) {
        const [loyalQtd, usersQtd] = await getAwardedUsers();

        const resources = {
            pageTitle: "Dashboard",
            loyalQtd,
            usersQtd,
            userName
        }

        return res.render('dashboard.njk', resources);
    },

    async index(req, res) {
        const { page = 1 } = req.query;
        const [loyalQtd, usersQtd] = await getAwardedUsers();
        const usersList = await User.paginate({}, { page, limit: 10 });
        const resources = {
            pageTitle: "Usuários",
            loyalQtd,
            usersQtd,
            usersList,
            userName
        };
        return res.render('users.njk', resources);
    },

    async form(req, res) {
        const [loyalQtd, usersQtd] = await getAwardedUsers();
        const resources = {
            pageTitle: "Novo Usuário",
            loyalQtd,
            usersQtd,
            userName
        };
        return res.render('create.njk', resources);
    },
    async create(req, res) {
        req.body.buy = req.body.buy.replace(',', '.');
        await User.create(req.body);
        return res.redirect('/users');

    },
    async show(req, res) {
        const users = await User.findById(req.params.id);
        return res.json(users);
    },

    async update(req, res) {
        let amount;
        if (req.body.sum) {
            const checkUser = await User.findById(req.params.id);
            amount = req.body.sum + checkUser.buy;
        } else {
            amount = req.body.buy;
        }
        const users = await User.findByIdAndUpdate(req.params.id, { ...req.body, buy: amount }, { new: true });
        return res.json(users);
    },

    async destroy(req, res) {
        await User.findByIdAndRemove(req.params.id);
    }
}

async function getAwardedUsers() {
    const users = await User.find();
    const loyalQtd = [];
    users.forEach((el) => {
        if (el.buy >= 500) {
            loyalQtd.push(el.buy)
        }
    })
    return [loyalQtd.length, users.length];
}