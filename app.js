const express = require('express');
const path = require('path');
const loginRouter = require('./routes/login');
const bodyParser = require('body-parser');

app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(loginRouter.router);

app.listen(3000,(err)=>{
    console.log('Listening to port 3000...')
})