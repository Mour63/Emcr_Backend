const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())

const pool  = mysql.createPool({
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'HrImpactdb'
})
app.get('/home', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * FROM utilisateur ',(err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            // if(err) throw err
            console.log('The data from utlisateurs table are: \n', rows)
        })
    })
})
app.listen(port, () => console.log(`Listening on port ${port}`))