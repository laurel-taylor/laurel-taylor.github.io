const MAX = 16777215;
const BUCKETS = 10;
const MAX_PIXEL_WIDTH = 32;
const bucketSize = MAX / BUCKETS;
const imageName = "../images/processing/sugasmile.json";

decimalColorToHTMLcolor = (number) => {
  var intnumber = number - 0;

  // isolate the colors - really not necessary
  var red, green, blue;

  // needed since toString does not zero fill on left
  var template = "#000000";

  // in the MS Windows world RGB colors
  // are 0xBBGGRR because of the way Intel chips store bytes
  red = (intnumber&0x0000ff) << 16;
  green = intnumber&0x00ff00;
  blue = (intnumber&0xff0000) >>> 16;

  // mask out each color and reverse the order
  intnumber = red|green|blue;

  // toString converts a number to a hexstring
  var HTMLcolor = intnumber.toString(16);

  //template adds # for standard HTML #RRGGBB
  HTMLcolor = template.substring(0,7 - HTMLcolor.length) + HTMLcolor;

  return HTMLcolor;
}

const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
const componentToHex = (c) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
const rgbToGrayHex = (r, g, b) => {
  let sum = 0;
  sum += parseFloat(r*0.89);
  sum += parseFloat(g*1.77);
  sum += parseFloat(b*0.33);

  const gray = Math.ceil(sum/3);
  return rgbToHex(gray, gray, gray);
}
const hexToGrayHex = (hex) => {
  const rgb = hexToRgb(hex);
  return rgb ? rgbToGrayHex(rgb.r, rgb.g, rgb.b) : null;
}

const getCircleObjFromHexString = (elem) => {
  const dec = parseInt(elem.substr(1), 16);

  const circleSize = Math.floor(dec / bucketSize);
  return {
    orig: elem,
    hex: `${elem}`,
    dec,
    size: BUCKETS-circleSize,
  }
}

const findAverage = (rowStart, colStart, pixelWidth, imageMap, grayscale = false) => {
  let total = { r: 0, g: 0, b: 0 };
  let numberOfPixels = 0;

  for(let i=0; i<pixelWidth; i++) {
    const rowIndex = i+rowStart;
    const row = imageMap[rowIndex];

    if(row) {
      for(let j=0; j<pixelWidth; j++) {
        const colIndex = j+colStart;
        const col = row[colIndex];

        if (col) {
          const rgb = hexToRgb(`${col}`);
          if (rgb) {
            total = {
              r: total.r + rgb.r,
              g: total.g + rgb.g,
              b: total.b + rgb.b,
            };
            numberOfPixels++;
          } else {
            console.log('error', col);
          }
        }
      }
    }
  }

  return grayscale ?
  rgbToGrayHex(
    Math.round(total.r / numberOfPixels),
    Math.round(total.g / numberOfPixels),
    Math.round(total.b / numberOfPixels)
  ) :
  rgbToHex(
    Math.round(total.r / numberOfPixels),
    Math.round(total.g / numberOfPixels),
    Math.round(total.b / numberOfPixels)
  );
}

const pixelate = (imageMap, pixelWidth, grayscale = true) => {
  const pixelMap = [];
  let pixelRowIndex = 0;
  const offset = Math.round(pixelWidth * 1);

  for (let i = 0; i < imageMap.length;) {
    const imageRow = imageMap[0];
    pixelMap[pixelRowIndex] = [];

    const colStart = pixelRowIndex %2 == 1 ? offset : 0;
    for (let j = colStart; j < imageRow.length;) {
      const avg = findAverage(i, j, pixelWidth, imageMap, grayscale);
      const elem = getCircleObjFromHexString(avg);
      pixelMap[pixelRowIndex].push(elem);

      j+=pixelWidth*2;
    }

    pixelRowIndex++;
    i+= Math.round(pixelWidth * 0.9);
    if (pixelRowIndex % 2 == 1) {
      // i-= 1; //Math.ceil(pixelWidth * 3/4);
    } else {
      // i+=Math.ceil(pixelWidth / 4);
    }
  }

  return pixelMap;
}

const generateRandomImage = (rows = 10) => {
  const imageMap = [];
  for (let i = 0; i < rows; i++) {
    imageMap[i] = [];

    for (let j=0; j<rows; j++) {
      const rand1 = Math.floor(Math.random() * Math.floor(255));
      const rand2 = Math.floor(Math.random() * Math.floor(255));
      const rand3 = Math.floor(Math.random() * Math.floor(255));
      imageMap[i].push(rgbToHex(rand1, rand2, rand3));
    }
  }
  return imageMap;
}

const main = async () => {
  let arr = [[]];

  try {
    await fetch(imageName)
    .then(response => response.json())
    .then(json => {
      arr = json;
    });
  } catch {
    const backupImageName = "../images/processing/img.json";
    console.log(imageName, 'not found, falling back to', backupImageName);

    try {
      await fetch(backupImageName)
      .then(response => response.json())
      .then(json => {
        arr = json;
      });
    } catch {
      const fallback = "../images/test.json";
      console.log(backupImageName, 'not found, falling back to', fallback);

      await fetch(fallback)
      .then(response => response.json())
      .then(json => {
        arr = json;
      });
    }
  }

  // const randomMap = generateRandomImage(10);

  const PIXEL_WIDTH = Math.floor(arr[0].length / MAX_PIXEL_WIDTH/2);
  const pixelMap = pixelate(arr, PIXEL_WIDTH);

  _createImage(arr);
  _drawPixels(pixelMap, PIXEL_WIDTH / 2);
  _addSize(`${pixelMap[0].length}w x ${pixelMap.length}h, ${arr.length * arr[0].length} pixels, pixel width: ${PIXEL_WIDTH}`);
  //console.log(pixelMap);
};

main();
