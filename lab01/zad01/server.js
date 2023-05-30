const express = require ('express');
const basicAuth = require('express-basic-auth');
const app = express();
const port = 3000;

const users = {'admin':'admin', 'kamil':'niemczyk'};

app.use(basicAuth({
    users: users,
    unauthorizedResponse: getUnauthorizedResponse
}));

function getUnauthorizedResponse(req) {
    return req.auth ?
        ('dane ' + req.auth.user + ':' + req.auth.password + ' odrzucone') :
        'nie podano danych logowania';
}

app.get('/protected', (req, res) => {
    res.send('Witaj w zabezpieczonej strefie - ' + req.auth.user + '!');
});

app.listen(3000, () => console.log(`Serwer działa na porcie ${port}!`));

