const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const config = require ('../config/config');


//FUNÇÕES AUXILIARES
const createUserToken = (userId) =>{
    return jwt.sign({id: userId}, config.jwt_pass, {expiresIn: config.jwt_expires_in});
}


router.get('/', async (req, res) => {

    try {
        const users = await Users.find({});
        return res.send(users);
    }
    catch {
        return res.status(500).send({ error: 'Erro na consulta de usuarios!'})
    }

});

router.post('/create', async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) return res.status(400).send({error: 'dados insuficientes'});

    try {
        if (await Users.findOne({email})) return res.status(400).send({ error:'Usuario já registrado!'});

        const user = await Users.create(req.body);
        user.password = undefined;

        return res.status(201).send({user, token: createUserToken(user.id)});

    }
    catch (err) {
        if(err) return res.status(500).send({ error:'Erro ao criar usuario.'});
    }

})

router.post('/auth', async (req, res) =>{
    const {email, password} = req.body;

    if(!email || !password) return res.status(400).send({ error: 'Dados insuficientes!'});

    try {
        const user =  await Users.findOne({ email }).select('+password');
        if (!user) return res.status(400).send ({error: 'usuario não registrado'});

        const pass_ok = await bcrypt.compare(password, user.password);

        if(!pass_ok)return res.status(401).send({error: 'erro ao autenticar usuario'});

        user.password = undefined;
        return res.send({user, token: createUserToken(user.id)});
    }
    catch (err){
         if (err) return res.status(500).send({error: 'erro ao buscar usuario'});
    }
}); 



module.exports = router;

/*

200 - OK
201 - Created
202 - Accepted

400 - Bad Request
401 - unauthorized -- Autenticação, tem caráter temporario.
403 - Forbidden -- Autorização, tem caráter permanente.
404 - Not found.

500 - Internal server error.
501 - Not implemented -- a API não suporta essa funcionalidade.
503 - Service Unavaliable -- a API executa essa operação, mas no momento está indisponível.
*/