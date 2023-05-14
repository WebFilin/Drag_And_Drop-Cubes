import { toJS } from "mobx";

// Проверка границ обшего контейнера элементов
const CheckBorderMain = (mainBoxSize, posX, posY, widthBox, bottom) => {
  const { left, top, height, width } = toJS(mainBoxSize);
  const sideRight = left + width - widthBox;
  const bottomCord = posY + bottom;

  if (top < posY && height > bottomCord && left < posX && sideRight > posX) {
    return true;
  }

  return false;
};

export default CheckBorderMain;
