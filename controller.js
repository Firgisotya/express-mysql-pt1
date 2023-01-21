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
    },

    delete: (req, res) => {
        let id = req.body.id_mhs;

        koneksi.query('DELETE FROM mahasiswa WHERE id_mhs=?', [id], (error, rows, fields) => {
            if (error) {
                console.log(error);
            } else {
                response.ok('Berhasil menghapus data!', res);
            }
        });
    },

    nested: (req, res) => {
        koneksi.query('SELECT mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks FROM krs JOIN mahasiswa JOIN matakuliah WHERE krs.id_mhs = mahasiswa.id_mhs AND krs.id_matakuliah = matakuliah.id_matakuliah ORDER BY mahasiswa.nim', (error, rows, fields) => {
            
            if (error) {
                console.log(error);
            } else {
                response.nested(rows, res);
            }
        });
    },
}