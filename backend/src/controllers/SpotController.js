const User = require('../models/User');
const Spot = require('../models/Spot');
const Helpers = require('../helpers');

module.exports = {
    async index(req,res) {
        res.json({ ok: true })
    },
    async store(req,res) {
        // Usuário
        const { user_id } = req.headers;

        // Verifica se o usuário está logado
        const user = await User.findById(user_id);
        if (!user)
            return res.status(400).json({ error: 'Usuário não existe!' });            

        // Demais dados
        const { thumbnail, company, price, techs } = req.body;

        // Decodifica o base64, grava na pasta
        const path = `${__dirname}/../../uploads/thumbnails/`;
        const pathCount = Helpers.pathCount(path);
        const extension = Helpers.findExtensionBase64File(thumbnail);
        const filename = `${pathCount}.${extension}`;
        Helpers.createFileFromBase64(path + filename, thumbnail);

        // Cria registro
        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price
        });

        // Retorna
        res.json(spot);
    }
}