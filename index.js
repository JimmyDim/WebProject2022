const express = require('express');
const app = express();
const path = require('path');
const userRouter = require('./routers/user');
const adminRouter = require('./routers/adminRouter');
const session = require('express-session');
const flash = require('connect-flash');
require('./db/mongoose')

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//parse the request body.
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'notagoodsecret' }));
app.use(flash());

app.use(express.json())
app.use(userRouter);
app.use(adminRouter);

app.listen(3000, () => {
    console.log("App is listening on port 3000!");
})
