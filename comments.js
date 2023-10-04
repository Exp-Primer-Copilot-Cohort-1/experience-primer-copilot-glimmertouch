// Create web server
// Load modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const commentsPath = __dirname + '/data/comments.json';

// Configure express
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/static'));

// Load comments
let comments = [];
fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    comments = JSON.parse(data);
});

// Define routes
app.get('/', (req, res) => {
    res.render('index', { comments: comments });
});

app.post('/comment', (req, res) => {
    comments.push(req.body);
    fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
        if (err) {
            console.error(err);
            return;
        }
        res.redirect('/');
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server started at http://localhost:3000/');
});