var express = require('express');
var app = express(); 
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');
var AWS = require('aws-sdk')
var async = require('async')
var bucketName = *YOUR IMAGE BUCKET NAME*
var path = require('path');
var analysis = require('./analysis');

AWS.config.update({ accessKeyId: *YOUR ACCESS KEY*, secretAccessKey: *YOUR SECRET KEY*});
var s3 = new AWS.S3({
  region: 'us-west-1'
 });

router.post('/api/v1/upload',function(req,res){
	console.log("In Post method")
	var form = new formidable.IncomingForm();
	form.parse(req);
	form.on('file', function (name, file){
		uploadToAWSS3(file)
        console.log('Uploaded ' + file.name);
        var URL = "https://s3-us-west-1.amazonaws.com/image-hoster-bucket/uploads/images/"+file.name;
        analysis.getAnalisys(URL,res);
    });
});

function uploadToAWSS3(file){
	var bodystream = fs.createReadStream(file.path);
	var params = {
    'Bucket': bucketName,
    'Key': 'uploads/images/' + file.name,
    'Body': bodystream,
    'ContentEncoding': 'base64', 
    ACL:'public-read-write',
    Metadata: {
        'Content-Type': 'image/jpeg'
    }
	};
    s3.upload(params, function(err, data) {
    if (err) {
      console.log(err.message);
    }
  });   
}

router.get('/',function(req,res){
	res.sendFile(path.join(__dirname,'../../index.html'));
});

module.exports = router;
