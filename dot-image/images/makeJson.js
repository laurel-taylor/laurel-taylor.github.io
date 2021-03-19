// Make sure we got a filename on the command line.
// if (process.argv.length < 3) {
//     console.log('Usage: node ' + process.argv[1] + ' FILENAME');
//     process.exit(1);
// }
// Read the file and print its contents.
const fs = require('fs');
const file = process.argv[2] || 'img.txt';
const filename = 'processing/' + file;
const outputFilename = 'processing/' + file.split('.')[0] + '.json';
console.log('Processing...');
let data = [];

const lineReader = require('line-reader');

function processFile() {
  lineReader.eachLine(filename, (line, last) => {
    const d = line.split(' ');
    if (d.length === 6) {
      const coords = d[0].split(',');
      const y = coords[0];
      const x = coords[1].substr(0, coords[1].length -1);
      const hex = d[3].substr(0, 7);
      if (!data[x]) data[x] = [];
      data[x][y] = hex;
    }

    if(last){
      // or check if it's the last one
      console.log('Writing to ', outputFilename);
      try {
        fs.unlinkSync(outputFilename);
      } catch {}
      fs.writeFileSync(outputFilename, JSON.stringify(data));
    }
  });

  try {
    fs.unlinkSync(filename);
  } catch {}
}

processFile();
