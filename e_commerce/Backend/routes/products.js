const {Product} = require('../models/product');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const FILE_TYPE_MAP  ={
    'image/png' : 'png' ,
    'image/jpeg' : 'jpeg' ,
    'image/jpg' : 'jpg' ,

}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid =FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('image invalide type') ;
        if(isValid){
            uploadError = null;
        }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname.split(' ').join('-') ;
      const extension =FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
  
  const uploadOptions = multer({ storage: storage })


//afficher list de tout les produits (localhost:3000/api/v1/products) ou les produit par categories (localhost:3000/api/v1/products?categories=idcategory1,idcategory2)
router.get(`/`,async (req, res) =>{
    //localhost:3000/api/v1/products?categories=2545555,23336
    let filter = {};
    if(req.query.categories){
        filter = {category: req.query.categories.split(',')}
    }
    const productList = await Product.find(filter).select('name  image category _id isFeatured');

    if(!productList) {
        res.status(500).json({success: false})
    } 
    res.send(productList);
})

//afficher un produit by id (recherche)
router.get(`/:id`, async (req, res) =>{
    const product = await Product.findById(req.params.id).populate('category');

    if(!product) {
        res.status(500).json({success: false})
    } 
    res.send(product);
})
 
//ajouter produit
router.post(`/`,uploadOptions.single('image') , async(req, res) =>{

    const category = await Category.findById(req.body.category)
    if(!category) return res.status(400).send('Invalid Category')
    const file = req.file;
    if(!file) return res.status(400).send('no image in the request')

    const fileName =file.filename;
    const basePath= `${req.protocol}://${req.get('host')}/public/uploads/`
    const product = new Product({
        name: req.body.name,
        description : req.body.description,
        richDesription : req.body.richDesription,
        image: `${basePath}${fileName}`, //https://localhost:3000/pubic/uploads/image-1554
        price : req.body.price,
        category : req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        
    })

    product_ = await product.save();

    if(!product_)
    return res.status(500).send('the product cannot be created')

    res.send(product_);
})

// Update product
router.put('/:id',uploadOptions.single('image') , async(req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send('Invalid Product id')
    }
    const category = await Category.findById(req.body.category)
    if(!category) return res.status(400).send('Invalid Category')

    const product = await Product.findById(req.params.id);
    if(!product) return res.status(400).send('Invalid product');

    const file=req.file;
    let imagePath;
    if(file){
        const fileName =file.filename;
        const basePath= `${req.protocol}://${req.get('host')}/public/uploads/`;
        imagePath=`${basePath}${fileName}`;
    }else{
        imagePath=product.image;
    }


    const updatedproduct = await Product.findByIdAndUpdate(req.params.id ,
    {
        name: req.body.name,
        description : req.body.description,
        richDesription : req.body.richDesription,
        image: imagePath,
        brand : req.body.brand,
        price : req.body.price,
        category : req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    },
    {new : true }
    ) 

    if(!updatedproduct)
        return res.status(500).send('the product cannot be updated')

    res.send(updatedproduct);
})

//Supprimer Product  api/v1/'id'
router.delete('/:id',async(req,res)=>{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product){
            return res.status(200).json({success : true , message : 'the product is deleted! '});

        }else {
            return res.status(404).json({success : false ,message : 'product not found !'})
        }
    }).catch(err=>{
        return res.status(400).json({success: false ,error : err})
    })
})

// afficher nombre des produits
router.get(`/get/count`, async (req, res) =>{ 
    const productCount= await Product.countDocuments((req.count) = req.count)

    if(!productCount) {
        res.status(500).json({success: false})
    }   
    res.send({ productCount : productCount})
})

// afficher les  (count) produits que isFeatured=true
router.get(`/get/Featured/:count`, async (req, res) =>{ 
    const count = req.params.count ? req.params.count : 0 ;
    const products= await Product.find({isFeatured : true}).limit(+count);

    if(!products) {
        res.status(500).json({success: false})
    }   
    res.send( products)
})

router.put('/gallery-images/:id',uploadOptions.array('images',10) , async(req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send('Invalid Product id')
    }
    const files = req.files ;
    let imagesPaths =  [];
    const basePath= `${req.protocol}://${req.get('host')}/public/uploads/`;
    if(files){
        files.map(file=>{
            imagesPaths.push(`${basePath}${file.fileName}`);
        })
    }
    let product = await Product.findByIdAndUpdate(req.params.id ,
        {
            images: imagesPaths,
        },
        {new : true }
        ) 
    if(!product)
        return res.status(500).send('the product cannot be updated')
    
    res.send(product);
})


module.exports=router;