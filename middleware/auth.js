const koneksi = require('../koneksi');
const mysql = require('mysql');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const response = require('../res');
const config = require('../config/secret');
const ip = require('ip');

module.exports = {
    register: (req, res) => {
        let post = {
            username: req.body.username,
            email: req.body.email,
            password: md5(req.body.password),
            role: req.body.role,
            tanggal_daftar: new Date()            
        }

        let query = "SELECT email FROM ?? WHERE ??=?";
        let table = ["user", "email", post.email];

        query = mysql.format(query, table);

        koneksi.query(query, (error, rows) => {
            if (error) {
                console.log(error);
            }else{
                if (rows.length == 0) {
                    let query = "INSERT INTO ?? SET ?";
                    let table = ["user"];

                    query = mysql.format(query, table);

                    koneksi.query(query, post, (error, rows) => {
                        if(error) {
                            console.log(error)
                        }else {
                            response.ok("Berhasil manambahkan data user baru", res)
                        }
                    })    
            } else {
                response.ok("Email sudah terdaftar", res)
            }
        }
    })
},

login: (req, res) => {
    let post = {
        password: req.body.password,
        email: req.body.email
    }

    let query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    let table = ["user", "password",md5(post.password,), "email", post.email];

    query = mysql.format(query, table);
    koneksi.query(query, (error, rows) => {
        if(error) {
            console.log(error)
        }else {
            if(rows.length == 1) {
                var token = jwt.sign({rows}, config.secret, {
                    expiresIn: 1440
                })
                id_user = rows[0].id;

                var data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                }

                var query = "INSERT INTO ?? SET ?";
                var table = ["akses_token"];

                query = mysql.format(query, table);
                koneksi.query(query, data, (error, rows) => {
                    if(error) {
                        console.log(error)
                    } else {
                        res.json({
                            success: true,
                            message: 'Token JWT',
                            token: token,
                            currUser: data.id_user
                    })
                }
                })
            }else {
                res.json({
                    error: true,
                    message: 'Email atau password salah',
            })
            }
        }
    })
},

halamanrahasia: (req, res) => {
    response.ok("Halaman ini hanya untuk user dengan role = 2", res)
}

}