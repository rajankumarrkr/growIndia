const cloudinary = require('./backend/config/cloudinary');

cloudinary.uploader.ping()
    .then(result => {
        console.log('Cloudinary Connection Successful:', result);
        process.exit(0);
    })
    .catch(error => {
        console.error('Cloudinary Connection Failed:', error);
        process.exit(1);
    });
