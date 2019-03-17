const express = require('express')
const fileUpload = require('express-fileupload');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
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
  var file = `/tmp/${sampleFile.name}`;
  sampleFile.mv(file, function(err) {
    if (err)
        return res.status(500).send(err);
        
    printFile(file).then((stdout) =>{
        res.send("Printing!");
    }).catch((err)=>{
        res.send(`Failed to print. Err: ${err}`);
    })
  });
});


async function printFile(file) {
    const { stdout, stderr } = await exec(`lp \"${file}\"`);
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    if(stderr) throw stderr;
    return stdout;
}

//not used yet
async function printerStatus() {
    const { stdout, stderr } = await exec('lpstat -p -d');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
