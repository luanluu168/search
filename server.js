require('dotenv').config();
const express = require('express');
const    path = require('path');
const    PORT = process.env.PORT || 4000;

const     app = express();

app.set('views', 'views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.all('*', (req, res) => {
    res.render('error', {msg: "The page you're looking for does not exist", code: 404})
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));