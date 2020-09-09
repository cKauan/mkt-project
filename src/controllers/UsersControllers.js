const mongoose = require('mongoose');
const User = mongoose.model('Users');
module.exports = {

    async main(req, res) {
        const users = await User.find({ buy: { $gte: 500 } });
        // users < 1 ? console.log('nenhum usuario') : console.log(users.length + ' usuarios');
        return res.render('layout.njk')
        // return res.json(users);
    },
    async index(req, res) {
        const { page = 1 } = req.query;
        const users = await User.paginate({}, { page, limit: 10 });
        return res.json(users);
    },
    async create(req, res) {
        const users = await User.create(req.body);
        console.log(req.body.star)
        return res.json(users);
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
        return res.send("Well done");
    }
}