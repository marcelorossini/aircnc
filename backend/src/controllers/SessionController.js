const User = require('../models/User');

module.exports = {
    async store(req,res) {
        // Pega variáveis
        const { name, age, email } = req.body;

        // Busca pelo email
        let user = await User.findOne({ email })

        // Se o usuário não existir
        if (!user )
            user = await User.create({ name, age, email })

        // Retorna
        return res.json(user);
    }
};