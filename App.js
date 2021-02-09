const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const cors = require('cors');

// api
const login = require('./api/routes/user/login');
const smes = require('./api/routes/user/smes');
const register = require('./api/routes/user/register');
const test = require('./api/routes/test');

const port = 5001;

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

// call api
app.use("/test", test);
app.use("/user/smes", smes);
app.use("/user/login", login);
app.use("/user/register", register);


//if we are here then the specified request is not found
app.use((req, res, next)=> {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//all other requests are not implemented.
app.use((err, req, res, next) => {
    res.status(err.status || 501);
    res.json({
        error: {
            code: err.status || 501,
            message: err.message
        }
    });
});

//module.exports = app;

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
})
