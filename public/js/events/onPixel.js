let prevColIndex = -1;
let prevRowIndex = -1;
let prevEventListener = null;
let prevClickEventListener = null;

const onPixel = ({
  canvasEl,
  ctx,
  canvasSize,
  pixelSize,
  selectedColor,
  pixelData,
  onClickCallback,
}) => {
  if (prevEventListener !== null) {
    canvasEl.removeEventListener("mousemove", prevEventListener);
    canvasEl.removeEventListener("click", prevClickEventListener);
  }
  prevEventListener = (evt) =>
    onMouseMovePixel({
      evt,
      ctx,
      canvasSize,
      pixelSize,
      selectedColor,
      pixelData,
    });
  prevClickEventListener = (evt) =>
    onClickPixel({
      evt,
      ctx,
      canvasSize,
      pixelSize,
      selectedColor,
      pixelData,
      callback: onClickCallback,
    });

  canvasEl.addEventListener("mousemove", prevEventListener);
  canvasEl.addEventListener("click", prevClickEventListener);
};

const onClickPixel = ({
  evt,
  ctx,
  canvasSize,
  pixelSize,
  selectedColor,
  pixelData,
  callback,
}) => {
  const x = evt.offsetX;
  const y = evt.offsetY;

  const colIndex = Math.floor(x / pixelSize);
  const rowIndex = Math.floor(y / pixelSize);

  if (rowIndex * pixelSize >= canvasSize.height) {
    return;
  }

  // ctx.fillStyle = selectedColor;
  // ctx.fillRect(
  //   colIndex * pixelSize,
  //   rowIndex * pixelSize,
  //   pixelSize,
  //   pixelSize
  // );

  callback({
    color: selectedColor,
    colIndex,
    rowIndex,
  });
};

const onMouseMovePixel = ({
  evt,
  ctx,
  canvasSize,
  pixelSize,
  selectedColor,
  pixelData,
}) => {
  const x = evt.offsetX;
  const y = evt.offsetY;

  const colIndex = Math.floor(x / pixelSize);
  const rowIndex = Math.floor(y / pixelSize);
  // console.log("colIndex", colIndex);
  // console.log("rowIndex", rowIndex);

  if (rowIndex * pixelSize >= canvasSize.height) {
    return;
  }

  // console.log("prevColIndex", prevColIndex);
  // console.log("selectedColor", selectedColor);

  if (prevColIndex !== colIndex || prevRowIndex !== rowIndex) {
    ctx.fillStyle = selectedColor;
    ctx.fillRect(
      colIndex * pixelSize,
      rowIndex * pixelSize,
      pixelSize,
      pixelSize
    );

    const color = pixelData[prevRowIndex]?.[prevColIndex] || "white";
    ctx.fillStyle = color;
    ctx.fillRect(
      prevColIndex * pixelSize,
      prevRowIndex * pixelSize,
      pixelSize,
      pixelSize
    );

    prevColIndex = colIndex;
    prevRowIndex = rowIndex;
  }
};

export default onPixel;
