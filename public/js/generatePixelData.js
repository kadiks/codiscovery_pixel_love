const generatePixelData = ({ canvasEl, ctx, canvasSize, pixelSize }) => {
  const pixelData = [];
  const colMax = canvasSize.width / pixelSize;
  const rowMax = canvasSize.height / pixelSize;

  for (let rowIndex = 0; rowIndex < rowMax; rowIndex++) {
    const cols = [];
    for (let colIndex = 0; colIndex < colMax; colIndex++) {
      cols.push("white");
    }
    pixelData.push(cols);
  }

  return pixelData;
};

export default generatePixelData;
