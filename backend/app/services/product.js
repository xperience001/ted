const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const uniqueFilename = new Date().toISOString();

// SEND FILE TO CLOUDINARY
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

class Product {
    uploadToCloud(filePath){
        return new Promise((resolve, reject)=>{
            cloudinary.uploader.upload(
                filePath,
                { public_id: `product/${uniqueFilename}`, tags: `product` },
                (err, image) => {
                  if (err){
                    reject(err);
                  }
                  if(image) {
                    console.log('file uploaded to Cloudinary')
                    // remove file from server
                    fs.unlinkSync(filePath);
                    // return image details
                    resolve(image);
                  }
                }
              )
        });
    }
}
module.exports = new Product();