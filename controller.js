'use strict';

var response = require('./res');
var koneksi = require('./koneksi');

module.exports = {
    index: (req, res) => {
        response.ok('Aplikasi REST API ku berjalan!', res);
    },

    show: (req, res) => {
        koneksi.query('SELECT * FROM mahasiswa', (error, rows, fields) => {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
            }
        });
    },

    showId: (req, res) => {
        let id = req.params.id;
        koneksi.query('SELECT * FROM mahasiswa WHERE id_mhs = ?', [id], (error, rows, fields) => {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
            }
        });
    }
}