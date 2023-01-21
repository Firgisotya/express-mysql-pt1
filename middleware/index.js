const express = require('express');
const auth = require('./auth');
const router = express.Router();
const verifikasi = require('./verifikasi');

router.post('/api/v1/register', auth.register);
router.post('/api/v1/login', auth.login);

//perlu otorasi
router.get('/api/v1/rahasia', verifikasi(), auth.halamanrahasia);

module.exports = router; 