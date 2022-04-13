const drawPixel = ({ canvasEl, ctx, canvasSize, pixelSize, pixelData }) => {
  const colMax = canvasSize.width / pixelSize;
  const rowMax = canvasSize.height / pixelSize;

  for (let colIndex = 0; colIndex < colMax; colIndex++) {
    for (let rowIndex = 0; rowIndex < rowMax; rowIndex++) {
      const color = pixelData[rowIndex]?.[colIndex];
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(
          colIndex * pixelSize,
          rowIndex * pixelSize,
          pixelSize,
          pixelSize
        );
      }
    }
  }
};

export default drawPixel;
