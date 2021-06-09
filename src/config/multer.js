// Set up multer
const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'static/public/uploads');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.jpg`);
    },
});

const upload = multer({ storage });

const profileUpload = upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'avatar', maxCount: 1 },
]);

module.exports = { profileUpload };
