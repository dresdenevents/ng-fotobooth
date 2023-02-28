const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

// Multer-Konfiguration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Speicherort der hochgeladenen Datei
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('image'), (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const file = req.file;
  const filename = file.originalname;
  res.status(200).send('File uploaded successfully.');
});

app.get('/', (req, res) => {
  //res(`test`);
  res.send( "Hello world!" );
});

app.get('/image', (req, res, next) => {

const directoryPath = __dirname + '/uploads/';
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return next(err);
    }
    if (files.length === 0) {
      return res.status(404).send('No image found');
    }
    const newestFile = files.reduce((prev, current) => {
      const prevTimestamp = fs.statSync(directoryPath + prev).mtime.getTime();
      const currentTimestamp = fs.statSync(directoryPath + current).mtime.getTime();
      return prevTimestamp > currentTimestamp ? prev : current;
    });
    const image = fs.readFileSync(directoryPath + newestFile);
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.end(image, 'binary');
  });

  //const filename = req.params.filename;
  //res.sendFile(`${__dirname}/uploads/${filename}`);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});