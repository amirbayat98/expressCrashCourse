const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const member = require('./Member');

const logger = require('./middleware/logger');
const app = express();


//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.get('/', (req,res) => {
    res.render('index', {
        title: "member app",
        member
    });
});

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended : false}));
//
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname,'public', 'index.html'));
// });


//init middleware
//app.use(logger);

//set static folder - this send the folder to the client! but you should link to about.html
app.use(express.static(path.join(__dirname, 'public')));
//members api routese
app.use('/api/members', require('./routes/api/members'));




const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log(`server started on port ${PORT}`);
});

