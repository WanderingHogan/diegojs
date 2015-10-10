var AdmZip = require('adm-zip'),
    async = require('async'),
    fs = require('fs');

module.exports = {
  extractAll: function(inDIR) {
    var data = fs.readdirSync(inDIR);
    //using async to control flow, would it blow theusers computer/mem usage up
    //if we did all the unzip at once?
    console.log('....Extracting ', data.length, ' zip files.')
    //add delete original option
    //add outDIR option
    //flatten vs as-is
    async.each(data, function(item, callback){
      try {
        var zip = new AdmZip(inDIR + '/' + item);
        zip.extractAllTo(inDIR, true);
        console.log('....extracting ', item)
      }
      catch(err){
        console.log('!...un-extractable file', item)
      }
    }, function(err){
      console.log(err)
    });
  }
};
