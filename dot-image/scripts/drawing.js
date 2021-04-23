const _createImage = (imageMap, selector='image') => {
  const table = document.getElementById(selector);

  imageMap.forEach((row) => {
    const rowContainer = document.createElement('div');
    rowContainer.className = "pixel-row";

    row.forEach((elem) => {
      const container = document.createElement('div');
      container.className = 'pixel';
      container.style.backgroundColor = `${elem}`;

      rowContainer.appendChild(container);
    });
    table.appendChild(rowContainer);
  });
};

const getRainbow = () => {
  const large = 5;
  const small = 2;
  return [
    {color: 'red', rows: large},
    {color: 'orange', rows: large},
    {color: 'goldenrod', rows: small},
    {color: 'green', rows: large},
    {color: 'blue', rows: large},
    {color: 'purple', rows: large},
    {color: 'violet', rows: small}
  ]
};

const createRainbow = () => {
  const rainbow = [];
  let og = getRainbow();
  og = og.concat(og);
  og.forEach(({color, rows}) => {
    for(var i=0; i<rows; i++) {
      rainbow.push(color);
    }
  });

  return rainbow;
};

const _drawPixels = (pixelMap, selector="pixel") => {
  const rotator = createRainbow();
  const randomRainbow = getRainbow();
  const rowPadding = document.getElementById('rowPadding').value;
  for (let rowIndex=0; rowIndex<pixelMap.length; rowIndex++) {
      if (rowIndex % 2 !== 0) {
        const removed = rotator.splice(0, 1);
        rotator.push(removed);
      }
      _createRow(rowIndex, selector);

    pixelMap[rowIndex].forEach(({ size, dec, hex }, colIndex) => {
      const randomRainbowIndex = Math.floor(Math.random() * randomRainbow.length);
      _addObjToTable({
        obj: {
        text: dec,
        color: hex,
        size,
        rainbowColor: rotator[colIndex],
        randomColor: randomRainbow[randomRainbowIndex].color
      }, rowIndex: rowIndex+1, selector, rowPadding });
    });
  }
};

const _drawSample = (sizeMap, selector="pixel") => {
  document.getElementById(selector).innerHTML = "";
  document.getElementById('showImageContainer').className = 'hidden';
  const rowPadding = document.getElementById('rowPadding').value;

  for (let i=0; i<sizeMap.length; i++) {
    const rowIndex = i+1;
    _createRow(i, selector);

    sizeMap[i].forEach((size) => {
      _addToTable({
        obj: {size},
        rowIndex,
        selector,
        rowPadding,
      });
    });
  }
};

const _addToTable = ({
  obj: { size, rainbowColor, randomColor },
  rowIndex,
  selector,
  rowPadding,
} = { selector: 'pixel', rowPadding: -3 }) => {
  const container = document.createElement('div');
  container.className = 'box';
  container.style.marginTop = `${rowPadding}px`;
  container.style.marginBottom = `${rowPadding}px`;

  const circle = document.createElement('div');
  circle.className = `size-${size} circle`;
  // circle.style.backgroundColor = randomColor;
  // circle.style.borderColor = randomColor;
  // circle.innerHTML = size;

  container.appendChild(circle);

  const row = document.getElementById(`${selector}-${rowIndex}`);
  row.appendChild(container);
};

const _addObjToTable = ({obj, rowIndex, selector, rowPadding}) => {
  _addToTable({ obj, rowIndex, selector, rowPadding });
};

const _createRow = (i, selector="pixel") => {
  const table = document.getElementById(selector)
  const rowIndex = i+1;
  const row = document.createElement('div');
  row.id = `${selector}-${rowIndex}`;
  row.className = 'row';
  table.appendChild(row);
}

const _addSize = (text, selector="size") => {
  const elem = document.getElementById(selector)
  elem.innerHTML = text;
};

const _pasteBin = (pixelMap) => {
  const pastebin = document.getElementById('textPaste');
  let str = '';
  const sizeMap = pixelMap.map((row) => row.map(({ size }) => size ));

  pastebin.innerHTML = JSON.stringify(sizeMap);
};

const toggleLoading = () => {
  hideShowById('configs');
  hideShowById('loading');
};

const toggleShowImage = () => {
  toggleLoading();
  setTimeout(() => {
    hideShowById('image', 'map img');
    toggleLoading();
  }, 1);
};

const hideShowById = (id = 'image', origClass = '') => {
  const img = document.getElementById(id);
  const isHidden = img.className.indexOf('hidden') >= 0;

  if (isHidden) {
    img.className = origClass;
  } else {
    img.className = 'hidden';
  }
};

const darkness = (className = 'light') => {
  const pxl = document.getElementById('pixel');
  pxl.className = `map pxl ${className}`;
}
