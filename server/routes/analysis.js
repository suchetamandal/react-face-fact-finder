var request = require('request');

exports.getAnalisys = function(URL,res){
  var options = { method: 'POST',
  url: 'https://api.kairos.com/v2/media',
  qs: { source: URL },
  headers: 
   { 
     app_key: '604a9de8bb46f89ffe8722cc5d320d0d',
     app_id: 'e26ffd93',
     'content-type': 'application/json' } 
  };

	request(options, function (error, response, body) {
  		if (error) throw new Error(error);
    console.log(body);  
		res.send(JSON.stringify({analysis : body}));
	});
}
