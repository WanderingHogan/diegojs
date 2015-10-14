# diego

**Diego** is a command line tool written with nodejs that is meant to make bulk downloading, converting, uploading, and extracting data a little bit easier. A lot of data out there, especially geo data, is annoying to collect and work with. Hopefully diego can save you some time and not get in your way too much.

We are going to keep diego as light weight and simple as possible.


# installation
First, you need to have nodejs installed.

To install diego js, in your terminal type:
    $ npm install -g diego

# dependencies
[commander](https://www.npmjs.com/package/commander), [request](https://www.npmjs.com/package/request), [cheerio](https://www.npmjs.com/package/cheerio), [async](https://www.npmjs.com/package/async), [adm-zip](https://www.npmjs.com/package/adm-zip), [excel](https://www.npmjs.com/package/excel), [ftp-get](https://www.npmjs.com/package/ftp-get),



This has only been tested, so far, with node 4.1.x and node 0.12.x on osx 10.11.

# tools

### converting data
<i>coming soon</i>

---

### download tools
#### bulk file download

The **download** command opens your input URL, finds the file types you are looking for, and downloads them to your output directory.

```javascript

    diego download [-f] [input url] [output directory]
```

###### optional
<b>-f --fileTypes</b>: The default download type is zip. If you want to download other filetypes include them here as a comma separated value. ex, to download all comma seperated, pdf, zip, and text files:

```javascript
  diego download -f csv,pdf,zip,txt <inurl> <outfolder>
```

###### required
<b>[input url]</b>: This is the url you want to download from. Can be ftp, http, and https. Some https pages have issues.

<b>[output directory]</b>: This has to be an existing folder you have write permission to.

```javascript
  diego download -f csv,xlsx,pdf,zip http://www.ecy.wa.gov/services/gis/data/data.htm ~/Downloads/census

  diego download http://www2.census.gov/geo/tiger/TIGER2015/TRACT/ ~/Downloads/census/
```

---

### extracting
#### bulk file download

The **extract** command looks in your specified directory, and extracts all of the zip files.

coming soon - flatten tag, more compressed data types, delete original

```javascript

    diego extract [directory]
```

###### required

<b>[directory]</b>: This has to be an existing folder you have write permission to which contains zip files.

```javascript
  diego extract ~/Downloads/census

```
---

contact/questions/suggestions always welcome and appreciated
