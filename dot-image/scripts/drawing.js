const _createImage = (imageMap, selector='image') => {
  const table = document.getElementById(selector);

  imageMap.forEach(row => {
    const rowContainer = document.createElement('div');
    rowContainer.className = "pixel-row";

    row.forEach(elem => {
      const container = document.createElement('div');
      container.className = 'pixel';
      container.style.backgroundColor = `${elem}`;

      rowContainer.appendChild(container);
    });
    table.appendChild(rowContainer);
  });
};

const _drawPixels = (pixelMap, offset, selector="pixel") => {
  for (let i=0; i<pixelMap.length; i++) {
      const rowIndex = i+1;
      _createRow(i, offset, selector);

    pixelMap[i].forEach(elem => {
      _addToTable({ text: elem.dec, color: elem.hex, className: elem.className }, rowIndex, selector);
    })
  }
}

const _addToTable = ({ text, color, className }, rowIndex, selector="pixel") => {
  const container = document.createElement('div');
  container.className = 'box';
  // container.style.backgroundColor = color;

  const circle = document.createElement('div');
  circle.className = `${className} circle`;
  // elem.innerHTML = text;

  container.appendChild(circle);

  const row = document.getElementById(`${selector}-${rowIndex}`);
  row.appendChild(container);
};

const _createRow = (i, offset, selector="pixel") => {
  const table = document.getElementById(selector)
  const rowIndex = i+1;
  const row = document.createElement('div');
  row.id = `${selector}-${rowIndex}`;
  row.className = 'row';
  if(i % 2 == 1) {
    // row.style.marginLeft = offset + 'px';
  //   const fillerBox = document.createElement('div');
  //   fillerBox.style.width = offset;
  //   fillerBox.className = 'box';
  //   row.appendChild(fillerBox);
  }
  table.appendChild(row);
}

const _addSize = (y, x, selector="size") => {
  const elem = document.getElementById(selector)
  elem.innerHTML = `${x}w x ${y}h`;
}
