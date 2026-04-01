const cloudinary = require('./config/cloudinary');
cloudinary.uploader.ping()
    .then(r => { console.log('OK'); process.exit(0); })
    .catch(e => { console.error('FAIL', e); process.exit(1); });
