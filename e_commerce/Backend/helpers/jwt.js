const expressJwt = require('express-jwt');

function authJwt(){
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return expressJwt({
    secret,   
    algorithms: ['HS256'], 
    isRevoked: isRevoked 
  }).unless({
    path : [ 
      /**{url: /\/public\/uploads(.*)/ , methods: ['GET', 'OPTIONS'] },
      {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
      {url: /\/api\/v1\/categories(.*)/ , methods: ['GET', 'OPTIONS'] },
      {url: /\/api\/v1\/orders(.*)/ , methods: ['GET', 'OPTIONS','POST'] },
      `${api}/users/login`,
      `${api}/users/register`,**/ 
      {url: /(.*)/ },
    ]
  })  
} 

async function isRevoked(req, payload , done){
  if(!payload.isAdmin){
    done(null , true)
  } 
  done();
}

module.exports = authJwt();

/*
const jwt = require('jsonwebtoken');

function authJwt() {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'secret');
      req.userData = { userId: decodedToken.userId };
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Auth failed' });
    }
  };
}

module.exports = authJwt();*/