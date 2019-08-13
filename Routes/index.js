const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


router.get('/', auth, (req, res) =>  {
    console.log(res.locals.auth_data)
    return  res.send({ message:  'Tudo ok com o metodo get da raiz' });
});
router.post('/', (req, res) =>  {
    return  res.send({ message:  'Tudo ok com o metodo Post da raiz' });
});




module.exports = router;  