const express = require('express');
const app = express();
const JWT = require('jsonwebtoken')
const Data = require('./data/events');

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

  if (AuthHeader !== null) {
    const Token = AuthHeader.split(' ')[1] || "NoToken";

    DecodeJWT(Token).then(Payload => {
      req.User = Payload;
      next();
    }).catch(err => 
      res.status(403).json({
        error: "Invalid Token"
      })
    );
  } else {
    res.status(403).json({
      error: "No Token Provided"
    });
  }
};

const getFilterCities = (TargetCity, DataSet) => // Realistically this should be querying a Database of some sort
  DataSet.filter(Event => Event.Location.City.toLowerCase() === TargetCity.toLowerCase());

app.use(JWTMiddleware);

app.get(['/events', '/events/:location'], (req, res) => {
  const Location = req.params.location || req.User.location;
  const Cities = getFilterCities(Location, Data);
  
  res.json(Cities.slice(0, 5))
});

app.get('*', (req, res) => {
  res.status(403).json({
    error: "Malformed Endpoint"
  });
});

module.exports = app;