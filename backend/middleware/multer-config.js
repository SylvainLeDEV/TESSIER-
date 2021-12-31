const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/gif': 'gif'
};

const limits = {
    fileSize : 5 * 1024 * 1024,
    //5 242 880byte/Octets = 5Mo
};

const types = Object.keys(MIME_TYPES)

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (types.includes(file.mimetype)) {
            callback(null, 'images');
        } else {
            callback(new Error("Only jpg, jpeg, png, gif"), true)
        }
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        const nameEdit = name.split("." + extension).join("")
        callback(null, nameEdit + Date.now() + '.' + extension);
    },
});

module.exports = multer({limits ,storage}).single('image');
