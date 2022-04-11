const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const key = '87764d1a-92dc-4ced-a758-9c898c31d525'

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};

router.post('/login', (req, res) => {
    let token = 'hacker!!'
    if (req.body.username === mockUser.username &&
        req.body.password === mockUser.password) {
        console.log('login successful')
        token = jwt.sign(req.body.username, key);
    }
    res.json({ hackMe: token })
});

function verifyToken (token, key) {
    try {
        var decoded = jwt.verify(token, key);
        return decoded
    } catch (err) {
        return false;
    }
}

router.get('/profile', (req, res) => {
    const decoded = verifyToken(req.headers.token, key)
    if (decoded) {
        res.json({ mockUser })
    } else {
        res.status(403)
        res.json({ error: 'Invalid token' })
    }
});

module.exports = router;
