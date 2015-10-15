#!/usr/bin/env node

'use strict';

var program = require('commander'),
  downloadStuff = require('./download.js'),
  extractStuff = require('./extract.js'),
  fs = require('fs');

//download files from website
program
  .command('download [inURL] [outDIR]')
  .option('-f --fileTypes [filetypes]', 'filetypes')
  .option('-n --nameLike <nameLike>', 'Only download files with names like the input')
  .description('this looks at an input url and downloads all the zip files on ' +
    'that page to the destination folder of your choice. optionally, include the ' +
    'file types you are interested in downloaded as either a string or array of strings')
  // .option("-t, --types <type>", "file types you want to download. string or array of strings")
  .action(function(inURL, outDIR, options) {
    //check to make sure the outURL is writable by the user
    fs.access(outDIR, fs.W_OK, function(err) {
      if (err) console.log(err)
    })
    downloadStuff.downloadAll(inURL, outDIR, options);
  });

//go through all zips in a folder and extract the data
program
  .command('extract [inDIR]')
  .description('this looks at an input url and downloads all the zip files on ' +
    'that page to the destination folder of your choice')
  .option("-f, --flatten", "extracted files will be taken out of folders and")
  .action(function(inDIR, options) {
    if (options.flatten) {
      console.log('flatten flag set to ', options.flatten)
    }
    extractStuff.extractAll(inDIR);
  });

program.parse(process.argv);
