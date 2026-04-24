const multer = require('multer');
const path = require('path');
const config = require('../config');
const { success, error } = require('../utils/response');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.upload.dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '_' + Math.random().toString(36).substring(2, 8) + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('不支持的文件类型'));
    }
  }
}).single('file');

const uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return error(res, 400, '文件上传失败: ' + err.message);
      }
      return error(res, 400, err.message);
    }
    if (!req.file) return error(res, 400, '请选择文件');

    const filePath = '/' + config.upload.dir.replace(/^\.\//, '') + '/' + req.file.filename;
    success(res, { url: filePath, filename: req.file.filename }, '上传成功');
  });
};

module.exports = { upload: uploadFile };
