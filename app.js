const express = require('express');
const app = express();
const JWT = require('jsonwebtoken')

const DecodeJWT = Token => new Promise((Resolve, Reject) => // The JWT Library does not support promises yet
  JWT.verify(Token, process.env.JWTSecret, function(err, payload) {
    if (err) {
      Reject(err);
    }

    if (typeof payload !== 'undefined') {
      Resolve(payload)
    }
  })
);

const JWTMiddleware = (req, res, next) => {
  const AuthHeader = req.get('Authorization') || null;
  const Token = AuthHeader.split(' ')[1] || "NoToken";

  DecodeJWT(Token).then(Payload => {
    req.User = Payload;
    next();
  }).catch(err => 
    res.status(403).json({
      error: "Invalid Token"
    })
  );
};

app.use(JWTMiddleware);

app.get(['/events', '/events/:location'], (req, res) => {
  res.json({
    Hello: "World",
  })
});

app.get('*', (req, res) => {
  res.status(403).json({
    error: "Malformed Endpoint"
  });
});

module.exports = app;