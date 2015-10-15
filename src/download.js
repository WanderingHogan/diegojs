var request = require('request'),
  cheerio = require('cheerio'),
  fs = require('fs'),
  async = require('async'),
  ftp = require('ftp-get');



//bulk downloads everything with a .zip extension by default, using -f flag
//we can download more file types
//add a -w --where flag that allows users to put in a fuzzy match for filenames.
//example -w north would download all files that had north in them

module.exports = {
  downloadAll: function(inurl, outdir, options) {
    console.log(options.nameLike)

    //this array holds the paths that are pulled out of the webpage you send us to
    var localArray = [];

    //default value for file types we are pulling from the website
    var optionsArray = ['zip']

    //if you specify filetypes in the command line, here is where we grab them
    //and stuff them in to optionsArray
    if(options.fileTypes){
      optionsArray = options.fileTypes.split(',');
    }

    //here we go to the inurl you specify
    request(inurl, function(error, response, body) {
      //if everything looks alright...
      if (!error && response.statusCode == 200) {
        //load the body in to an html parser
        var $ = cheerio.load(body);
        //for every a tag (link tag)
        $('a').each(function() {
          //loop through the optionsArray
          for (var i = 0, len = optionsArray.length; i < len; i++) {
            //for each item in the options array, if the a tag has that file type,
            //put it in the localArray
            // if the downloadable file either has the nameLike flag characters OR
            // there is no nameLike set
            //
            if (String($(this).attr('href')).indexOf('.' + optionsArray[i]) > -1) {
              if(($(this).attr('href').indexOf(options.nameLike) > -1) || (!options.nameLike)){
                localArray.push($(this).attr('href'))
              }

            }
            //after it goes through all the optionsArray, go to the next a tag
            //and start over
          }
        })
      }
      console.log('....Found ', localArray.length, ' files to download. Opening a stream to each file.')


      //for every file we collected
      async.each(localArray, function(item, callback) {

        var fileName, filePath, isFTP;

        //convert item in to array by slashes (to get just the file name)
        var newitem = item.split('/')
        fileName = newitem[newitem.length-1]
        //check if full path

        //if the file name is a full path (eg http://hogan.io/filename.pdf)
        // we will download using that full path
        if((item.indexOf('http') > -1) || (item.indexOf('ftp') > -1)){
            filePath = item;
            if(item.indexOf('ftp') > -1) isFTP = true;
            else isFTP = false;
        }

        //but if it is a relative path, we need to prepend the inurl to get the file
        else {
            filePath = inurl + '/' + item;
        }

        //ftp's are weird
        if(isFTP) {
          //this is synchronous, doesn't really make sense to keep this here long term
          ftp.get(filePath, outdir + '/' + fileName, function (err, res) {
              if(err) console.log('!....... Error, ', err.code, err.url.href)
              else console.log('........done ', item);
          })
        }
        else {
          //try to download http and https links async here
          request(filePath).pipe(fs.createWriteStream(outdir + '/' + fileName)).on('close', function() {
            console.log('........done ', item);
            callback();
          });
        }
      }, function(err) {
        console.log(err)
      });
    })

  }
};
