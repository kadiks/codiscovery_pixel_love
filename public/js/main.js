import drawColorBar from "./draw/drawColorBar.js";
import drawPixel from "./draw/drawPixel.js";
import generatePixelData from "./generatePixelData.js";
import onHoverColorBar from "./events/onHoverColorBar.js";
import onPixel from "./events/onPixel.js";

const socket = io();
// const socket = io("ws://localhost:3000"); // DEV

const canvasEl = document.querySelector("canvas");
const ctx = canvasEl.getContext("2d");

const pixelSize = 10;

const canvasSize = {
  width: canvasEl.width,
  height: canvasEl.height,
};

let pixelData = generatePixelData({
  canvasEl,
  ctx,
  canvasSize,
  pixelSize,
});

// console.table(pixelData);

const colorBarHeight = 70;
const colorBarPadding = 10;

canvasEl.height += colorBarHeight + colorBarPadding;

let selectedColor = "pink";

socket.on("update-pixel-data", (pixelData) => {
  pixelData = pixelData;
  drawPixel({
    canvasEl,
    ctx,
    canvasSize,
    pixelSize,
    pixelData,
  });
});

const onClickCallback = ({ color, rowIndex, colIndex }) => {
  pixelData[rowIndex][colIndex] = color;
  //   console.log(pixelData);
  socket.emit("update-pixel-data", pixelData);

  onPixel({
    canvasEl,
    ctx,
    canvasSize,
    pixelSize,
    selectedColor,
    pixelData,
    onClickCallback,
  });
  drawPixel({
    canvasEl,
    ctx,
    canvasSize,
    pixelSize,
    pixelData,
  });
};

drawColorBar({
  canvasEl,
  ctx,
  canvasSize,
  pixelSize,
  colorBarHeight,
  colorBarPadding,
  callback: (color) => {
    selectedColor = color;

    onPixel({
      canvasEl,
      ctx,
      canvasSize,
      pixelSize,
      selectedColor,
      pixelData,
      onClickCallback,
    });
  },
});
onPixel({
  canvasEl,
  ctx,
  canvasSize,
  pixelSize,
  selectedColor,
  pixelData,
  onClickCallback,
});
drawPixel({
  canvasEl,
  ctx,
  canvasSize,
  pixelSize,
  pixelData,
});

// console.log("canvasSize", canvasSize);
