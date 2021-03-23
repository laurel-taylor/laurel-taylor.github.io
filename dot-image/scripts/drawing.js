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

const _drawPixels = (pixelMap, selector="pixel") => {
  for (let i=0; i<pixelMap.length; i++) {
      const rowIndex = i+1;
      _createRow(i, selector);

    pixelMap[i].forEach(({ size, dec, hex }) => {
      _addObjToTable({ text: dec, color: hex, size }, rowIndex, selector);
    })
  }
};

const _drawSample = (sizeMap, selector="pixel") => {
  document.getElementById(selector).innerHTML = "";
  document.getElementById('showImageContainer').className = 'hidden';

  for (let i=0; i<sizeMap.length; i++) {
    const rowIndex = i+1;
    _createRow(i, selector);

    sizeMap[i].forEach((size) => {
      _addToTable(size, rowIndex, selector);
    });
  }
};

const _addToTable = (size, rowIndex, selector="pixel") => {
  const container = document.createElement('div');
  container.className = 'box';
  // container.style.backgroundColor = color;

  const circle = document.createElement('div');
  circle.className = `size-${size} circle`;
  // circle.innerHTML = size;

  container.appendChild(circle);

  const row = document.getElementById(`${selector}-${rowIndex}`);
  row.appendChild(container);
};

const _addObjToTable = ({ size }, rowIndex, selector) => {
  _addToTable(size, rowIndex, selector);
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
