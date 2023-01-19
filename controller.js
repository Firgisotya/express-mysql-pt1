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
    },

    store: (req, res) => {
        let nim = req.body.nim;
        let nama = req.body.nama;
        let jurusan = req.body.jurusan;

        koneksi.query('INSERT INTO mahasiswa (nim, nama, jurusan) VALUES (?, ?, ?)', [nim, nama, jurusan], (error, rows, fields) => {
            if (error) {
                console.log(error);
            } else {
                response.ok('Berhasil menambahkan data!', res);
            }
        });
    },

    update: (req, res) => {
        let id = req.body.id_mhs;
        let nim = req.body.nim;
        let nama = req.body.nama;
        let jurusan = req.body.jurusan;

        koneksi.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mhs=?', [nim, nama, jurusan, id], (error, rows, fields) => {
            if (error) {
                console.log(error);
            } else {
                response.ok('Berhasil mengubah data!', res);
            }
        });
    }
}