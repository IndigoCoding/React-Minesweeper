require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const process = require('process');
const helmet = require('helmet');
const cors = require('cors');
const moment = require('moment');
const path = require('path');

const app = express();
const port = 3000;
const highscore_table = 'highscore';

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: 'minesweeper'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

if (process.platform === "win32") {
    var rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on("SIGINT", function () {
        process.emit("SIGINT", null);
    });
}

process.on("SIGINT", function () {
    //graceful shutdown
    connection.destroy();
    process.exit();
});

app.get('/highscore', (req, res) => {
    let response = {status: false, message: '', response: []};
    if(!req.query.mode){
        response.message = 'Invalid request';
        res.json(response);
    } else {
        try {
            let sql = "SELECT * FROM " + highscore_table + " WHERE mode = " + connection.escape(req.query.mode) + " ORDER BY score ASC LIMIT 10";
            connection.query(sql, function(error, results, fields){
                if (error) throw error;
                response.status = true;
                response.response = results;
                response.response.forEach(function(v){
                    v.date = moment.utc(v.date).format('YYYY/MM/DD');
                })
                res.json(response);
            })
        } catch (e) {
            response.message = 'Some error happened';
            res.json(response);
        }
    }
});

app.post('/highscore', (req, res) => {
    let response = {status: false, message: '', response: []};
    console.log(req.body);
    if(!req.body.name || !req.body.score || !req.body.mode){
        response.message = 'Invalid request';
        res.json(response);
    } else {
        let sql = "INSERT INTO " + highscore_table + "(name,score, mode) values(?, ?, ?)";
        connection.query(sql, [req.body.name, req.body.score, req.body.mode], function(error, results, fields){
            if (error){
                response.message = 'Some error happened';
                res.json(response);
            } else {
                try {
                    let sql = "SELECT * FROM " + highscore_table + " WHERE mode = " + connection.escape(req.body.mode) + " ORDER BY score ASC LIMIT 10";
                    connection.query(sql, function(error, results, fields){
                        if (error) throw error;
                        response.status = true;
                        response.response = results;
                        response.response.forEach(function(v){
                            v.date = moment.utc(v.date).format('YYYY/MM/DD');
                        })
                        res.json(response);
                    })
                } catch (e) {
                    response.message = 'Some error happened';
                    res.json(response);
                }
            }
        })
    }
});

app.get('/dino.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/dino.css'));
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/404.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});