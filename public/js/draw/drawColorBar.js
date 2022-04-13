import onHoverColorBar from "../events/onHoverColorBar.js";

const drawColorBar = ({
  canvasEl,
  canvasSize,
  ctx,
  pixelSize,
  colorBarHeight,
  colorBarPadding,
  callback,
}) => {
  const colors = ["red", "green", "blue", "white", "black", "pink"];
  const colorBoxWidth = 30;
  const colorBoxHeight = 30;

  colors.forEach((color, index) => {
    console.log("color", color);
    ctx.fillStyle = color;
    ctx.fillRect(
      index * colorBoxWidth,
      canvasSize.height + colorBarPadding,
      colorBoxWidth,
      colorBoxHeight
    );
  });

  onHoverColorBar({
    canvasEl,
    canvasSize,
    ctx,
    pixelSize,
    colorBarHeight,
    colorBarPadding,
    colors,
    colorBoxWidth,
    callback,
  });
};

export default drawColorBar;
