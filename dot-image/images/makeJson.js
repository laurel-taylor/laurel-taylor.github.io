const fs = require('fs');
const lineReader = require('line-reader');
const file = process.argv[2] || 'img.txt';
const filename = 'processing/' + file;
const outputFilename = 'processing/' + file.split('.')[0] + '.json';
console.log('Processing...');
let data = [];

try {
  fs.unlinkSync(outputFilename);
} catch (e) {
  console.log('error deleting..', e);
}

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
      fs.writeFileSync(outputFilename, JSON.stringify(data));
    }
  });

  try {
    fs.unlinkSync(filename);
  } catch {}
}

processFile();
