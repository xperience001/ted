const productController = require('../controllers/product');
const auth = require('../middlewares/auth');
const product = (app)=>{
    
    app.all('/', (req, res)=>{
        res.send({
            error: false,
            message: 'Welcome to the Product app'
        });
    })
    
    app.post('/create-product', auth, (req, res)=>{
        productController.createProduct(req, res);
    });

    app.get('/all-product', (req, res)=>{
        productController.getAllProduct(req, res);
    });

    app.get('/product/:id', (req, res)=>{
        productController.getProduct(req, res);
    });

    app.get('/product', (req, res)=>{
        productController.getProductsByUserId(req, res);
    });
      
}

module.exports = product;