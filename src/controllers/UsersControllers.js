const mongoose = require('mongoose');
const User = mongoose.model('Users');
const utils = require('./utils');

module.exports = {

    async userAuthenticated(req, res) {
        res.redirect('/')
    },

    async userLogout(req, res) {
        req.session = null;
        req.logout();
        res.render('login.njk');
    },

    async mainPage(req, res) {
        const [loyalQtd, usersQtd] = await utils.getAwardedUsers();
        const loggedUserInfo = utils.getGoogleAuthLoggedUserInfo(req.user);
        const resources = {
            pageTitle: "Dashboard",
            loyalQtd,
            usersQtd,
            loggedUserInfo
        }
        return res.render('dashboard.njk', resources);
    },

    async indexUsers(req, res) {
        const { page = 1 } = req.query;
        const usersList = await User.paginate({}, { page, limit: 10 });
        const loggedUserInfo = utils.getGoogleAuthLoggedUserInfo(req.user);
        const [loyalQtd, usersQtd] = await utils.getAwardedUsers();
        const resources = {
            usersList,
            pageTitle: "Todos os Usuários",
            loyalQtd,
            usersQtd,
            loggedUserInfo
        };
        return res.render('users.njk', resources);
    },
    async listLoyalUsers(req, res) {
        const { page = 1 } = req.query;
        const usersList = await User.paginate({ buy: { $gte: 500 } }, { page, limit: 10 });
        const loggedUserInfo = utils.getGoogleAuthLoggedUserInfo(req.user);
        const [loyalQtd, usersQtd] = await utils.getAwardedUsers();
        const resources = {
            usersList,
            pageTitle: "Usuários Premiados",
            loyalQtd,
            usersQtd,
            loggedUserInfo
        };
        return res.render('loyal-users.njk', resources);
    },
    async createForm(req, res) {
        const loggedUserInfo = utils.getGoogleAuthLoggedUserInfo(req.user);
        const [loyalQtd, usersQtd] = await utils.getAwardedUsers();
        const resources = {
            pageTitle: "Novo Usuário",
            loyalQtd,
            usersQtd,
            loggedUserInfo
        };
        return res.render('create.njk', resources);
    },

    async editUser(req, res) {
        const user = await User.findById(req.params.id);
        const loggedUserInfo = utils.getGoogleAuthLoggedUserInfo(req.user);
        const [loyalQtd, usersQtd] = await utils.getAwardedUsers();
        const resources = {
            pageTitle: "Editar Usuário",
            loyalQtd,
            usersQtd,
            loggedUserInfo,
            user
        };
        res.render('edit.njk', resources);
    },

    async createUser(req, res) {
        const formatedNumber = utils.convertFormatNumberToDBNumber(req.body.buy);
        await User.create({ ...req.body, buy: formatedNumber });
        return res.redirect('/users');
    },

    async showUsers(req, res) {
        const users = await User.findById(req.params.id);
        return res.json(users);
    },

    async updateUser(req, res) {
        /* Criar logica para adicionar valor ao buy
        let amount;
        if (req.body.sum) {
            const checkUser = await User.findById(req.params.id);
            amount = req.body.sum + checkUser.buy;
        } else {
            amount = req.body.buy;
        }
        */
        const formatedNumber = utils.convertFormatNumberToDBNumber(req.body.buy);
        await User.findByIdAndUpdate(req.params.id, { ...req.body, buy: formatedNumber }, { new: true });
        return res.redirect('/users');
    },

    async destroyUser(req, res) {
        await User.findByIdAndRemove(req.params.id);
        res.send("deletado")
    }
}
