const express = require('express')
const fileUpload = require('express-fileupload');
const printer = require('printer');
const app = express()
const port = 3000

app.use(express.static('public'))
//app.get('/', (req, res) => res.send('Hello World!'))

// default options
app.use(fileUpload());

app.post('/upload', function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  var sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  var file = `C:\\tmp\\${sampleFile.name}`;
  sampleFile.mv(file, function(err) {
    if (err)
      return res.status(500).send(err);
    
    res.send('File uploaded!');
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))