const multer = require('multer');
const productService = require('../services/product');
const productModel = require('../models/product');
const fs = require('fs');
const storage =   multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, './uploads');
	},
	filename: (req, file, callback) => {
		callback(null, file.originalname);
	}
});
const upload = multer({ storage }).single("file");

class Product {
    createProduct(req, res){
        upload(req, res, (err) => {
            if(!req.file){
                return res.json({
                    error: true,
                    message: 'ensure you upload file from formdata'
                }); 
            }
            const {path} = req.file;
            let  {title, description, user} = req.body;
            user = req.token;
            if(!title || !description){
                // delete the file uploaded to the server
                fs.unlinkSync(path);
                return res.json({
                    error: true,
                    message: 'oga pass the required fields'
                }); 
            }
            if (err) {
              console.log('eror while uploading', err);
              return res.json({
                error: true,
                message: 'eror while uploading',
                response: err
            });
            }
            console.log('file uploaded to server');
            productService.uploadToCloud(path)
            .then( image =>{
                let product = new productModel({
                    user, title, description, likes,
                    productImageUrl: image.url !== null ? image.url :
                     'default_image_path'
                });
                product.save()
                .then( data =>{
                    console.info('product has been persisted to mongodb');
                    res.json({
                        error: false,
                        message: 'product created',
                        response: data
                    });
                }).catch( error =>{
                    res.json({
                        error: true,
                        message: 'error saving tomongodb',
                        response: error
                    });
                });
            }).catch( error =>{
                res.json(error);
            })
          });   // end upload
          
    }

    getProduct(req, res){
        if(!id){
            return res.send({
                error: true,
                message: 'oga pass the id joor',
            });
        }
        const {id} = req.params;
        productModel.findById(id)
        .populate('user', 'fullname')
        .select({"__v":0, })
        .exec()
        .then( product =>{
            res.send({
                error: false,
                message: 'successfully fetched product',
                response: product
            });
        })
        .catch( error =>{
            res.send({
                error: true,
                message: 'error while querying product mongodb',
                response: error
            });
        });
    }

    getAllProduct(req, res){
        productModel.find()
        .populate('user', 'fullname')
        .select({"__v":0, })
        .exec()
        .then( products =>{
            res.send({
                error: false,
                totalCount: products.length,
                message: 'successfully fetched all products',
                response: products
            });
        })
        .catch( error =>{
            res.send({
                error: true,
                message: 'error while querying products mongodb',
                response: error
            });
        });
    }

    // TODO: make a route to get by by username
    getProductsByUserId(req, res){
        let {user} = req.query;
        productModel.find({user})
        .then( products =>{
            res.send({
                error: false,
                totalCount: products.length,
                message: 'successfully fetched all products',
                response: products
            });
        })
        .catch( error =>{
            if(error.name === 'CastError'){
                return res.send({
                    error: false,
                    message: `no products found for user ${user}`
                });
            }
            res.send({
                error: true,
                message: 'error while querying products mongodb',
                response: error
            });
        });
    }
}
module.exports = new Product();