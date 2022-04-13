const onHoverColorBar = ({
  canvasEl,
  ctx,
  canvasSize,
  pixelSize,
  colorBarPadding,
  colors,
  colorBoxWidth,
  callback,
}) => {
  canvasEl.addEventListener("click", (evt) => {
    const x = evt.offsetX;
    const y = evt.offsetY;

    if (y < canvasSize.height + colorBarPadding) {
      return;
    }

    const colIndex = Math.floor(x / colorBoxWidth);

    const color = colors[colIndex];

    callback(color);
  });
};

export default onHoverColorBar;
