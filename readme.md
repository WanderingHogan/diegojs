# diego

**Diego** is a command line tool written with nodejs that is meant to make bulk downloading, converting, uploading, and extracting data a little bit easier. A lot of data out there, especially geo data, is annoying to collect and work with. Hopefully diego can save you some time and not get in your way too much.

We are going to keep diego as light weight and simple as possible.


# installation
First, you need to have nodejs installed.

To install diego js, in your terminal type:
    $ npm install -g diego

# dependencies
[commander](https://www.npmjs.com/package/commander),[request](https://www.npmjs.com/package/request),[cheerio](https://www.npmjs.com/package/cheerio),[async](https://www.npmjs.com/package/async),[adm-zip](https://www.npmjs.com/package/adm-zip)

This has only been tested, so far, with node 4.1.2 on osx 10.11.

# tools

## converting data
<i>coming soon</i>

## download tools
#### bulk zip download

```javascript

    diego download [input url] [output directory]
```

The **download** command will accept an input URL. The input URL response is parsed and every .zip file is added to a list. Diego then goes through the list of zip files and downloads them to your output directory.

example:
download all 2015 census tract data from the census website into a folder called census

```javascript

    diego download http://www2.census.gov/geo/tiger/TIGER2015/TRACT/ ~/Downloads/census
```

<i>coming soon:</i> more file types to look for



## extracting
<i>coming soon</i>

contact/questions/suggestions always welcome and appreciated
