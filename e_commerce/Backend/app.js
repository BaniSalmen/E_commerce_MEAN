const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const path = require('path');


app.use(cors()); 
app.options('*', cors())

//middleware 
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(`${__dirname}/views`));
app.use(authJwt);  
 
app.use((err ,req , res , next )=>{
    if(err.name === 'UnauthorizedError'){  
        //jwt authentication error
        return res.status(401).json({message : 'the user is not authorized'});
    }

    if(err.name === 'ValidationError'){
        // validation error
        return res.status(401).json({message : err});
    }
    //server error
    res.status(500).json(err);
});
  
//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

const api = process.env.API_URL; 

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);





//Database 
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
    dbName: 'eshop_database'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

//Server 
app.listen(3000, ()=>{

    console.log('server is running http://localhost:3000');
})