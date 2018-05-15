/******************************************
# This will convert a list of file names into a js array to be used with karaoke list.js.
# usage: ./listmaker.sh fileNameList.txt
******************************************
# to create fileNameList.txt:
#
# on windows, run:
# cd "directory\to\copy"
# for /r %i in (*) do echo %~nxi > fileNameList.txt
#
# OR, without extensions:
#
# for /r %i in (*) do echo %~ni > fileNameList.txt
#
# on mac, run:
# find path/to/directory -type f -exec basename {} \; | sort > fileNameList.txt
##########################################
*/

const fs = require('fs');
const readline = require('readline');
const READ_FILE = process.argv[2] || 'fileNameList.txt';
const WRITE_FILE = process.argv[3] || 'list.js';
const BLACKLIST_FILE = process.argv[4] || 'blacklist.txt';

const makeContents = (contents) => {
    return `const buildSongList = () => {
        const a = new Array();
        ${contents}
        return a;
    };`
};

const writeToFile = (fileName, contents) => {
    fs.writeFile(fileName, contents, (err) => {
        if(err) {
            return console.log(err);
        }

        console.log('The file was saved:', fileName);
    });
};

const readFile = () => {
    fs.readFile(READ_FILE, 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        }
        console.log('data: ', data);
    });
};

const processLine = (data) => {
    const directory = data.split(/\\/);
    let songName = directory[directory.length - 1];
    songName = songName.replace(/"/g, '\\"');

    const whitelist = [
        /\..{3}$/,
    ];

    const blacklist = [
        /^\$.*/, // starts with $
        /MediaID\.bin/i,
        /pmp_usb\.ini/i,
        /archive\.zip/i,
        /\.css$/i,
        /\.gif$/i,
        /\.nfo$/i,
        /\.doc$/i,
        /\.txt$/i,
        /\.png$/i,
        /\.jpg$/i,
        /\.pdf$/i,
        /\.jpg\.bc!$/i,
    ];
    const isOnWhitelist = whitelist.some((pattern) => songName.match(pattern));
    const isOnBlacklist = blacklist.some((pattern) => songName.match(pattern));

    return {
        pass: isOnWhitelist && !isOnBlacklist,
        songName: `"${songName}"`,
    }
}

const processLargeFile = () => {
    var es = require('event-stream');
    let songList = '';
    const blackList = [];

    var s = fs.createReadStream(READ_FILE)
        .pipe(es.split())
        .pipe(es.mapSync(function(line){
            // pause the readstream
            s.pause();

            // process line here and call s.resume() when rdy
            // function below was for logging memory usage
            const temp = processLine(line);
            if (temp.pass) songList += `    a.push([${temp.songName}]);\n`
            else blackList.push(temp.songName)

            // resume the readstream, possibly from a callback
            s.resume();
        })
        .on('error', function(err){
            console.log('Error while reading file.', err);
        })
        .on('end', function(){
            console.log('Read entire file.')
            writeToFile(WRITE_FILE, makeContents(songList));
            writeToFile(BLACKLIST_FILE, blackList);
        })
    );
};

processLargeFile();
