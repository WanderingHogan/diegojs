var request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs'),
    async = require('async');


//bulk downloads everything with a .zip extension
//TODO - allow optional input paramater that accepts a string or an array
//that can collect other filetypes. ex: ['.xls', '.xlsx', '.pdf', '.zip'] - etc

module.exports = {
  downloadAll: function (inurl, outdir){
    //empty array we will put the downloadable links in
    var localArray = [];
    request(inurl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        $('a').each(function(){
          var link = $(this);
          if(String(link.attr('href')).indexOf(".zip") > -1){
            localArray.push(link.attr('href'))
          }
        })
      }
      console.log('....Found ',localArray.length, ' zip files to download. Opening a stream to each file.')
      async.each(localArray, function(item, callback){
          request(inurl+'/'+item).pipe(fs.createWriteStream(outdir+'/'+item)).on('close', function(){
            console.log('........done ', item);
            callback();
          });
      }, function(err){
        console.log(err)
      });
    })

  }
};
