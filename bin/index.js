#!/usr/bin/env node
'use strict';

var program = require('commander'),
    downloadStuff = require('./download.js'),
    extractStuff = require('./extract.js'),
    fs = require('fs')

//download zip files from website
program
  .command('download [inURL] [outDIR]')
  .description('this looks at an input url and downloads all the zip files on '+
                'that page to the destination folder of your choice')
  .action(function(inURL, outDIR){
    //check to make sure the outURL is writable by the user
    fs.access(outDIR, fs.W_OK, function (err) {
      if(err) console.log(err)
    })
    downloadStuff.downloadAll(inURL, outDIR);
  });

//go through all zips in a folder and extract the data
program
  .command('extract [inDIR]')
  .description('this looks at an input url and downloads all the zip files on '+
                'that page to the destination folder of your choice')
  .option("-f, --flatten", "extracted files will be taken out of folders and")
  .action(function(inDIR, options){
    if(options.flatten){
        console.log('flatten flag set to ', options.flatten)
    }
    console.log(inDIR);
    //check to make sure the outURL is writable by the user
    // fs.access(outURL, fs.W_OK, function (err) {
    //   if(err) console.log(err)
    // })
    // downloadStuff.downloadAll(inURL, outURL);
  });
program.parse(process.argv);
