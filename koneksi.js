const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'learn1'
})

conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
})

module.exports = conn;