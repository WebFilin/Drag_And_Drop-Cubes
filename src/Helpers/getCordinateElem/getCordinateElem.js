import checkBorderMain from "../checkBorderMain/checkBorderMain";

// Получаем координаты элемента для дропа
export default function GetCordinateElem(
  event,
  mainBoxSize,
  widthBox,
  shiftClick,
  cordDropX,
  cordDropY
) {
  const cordinate = { cordX: cordDropX, cordY: cordDropY };
  const { clientX, clientY } = event;
  const { shiftX, shiftY } = shiftClick;
  const cordX = clientX - shiftX;
  const cordY = clientY - shiftY;

  //Проверяем границы общего контейнера
  const borderCheked = checkBorderMain(mainBoxSize, cordX, cordY, widthBox, 0);

  if (borderCheked) {
    cordinate.cordX = cordX;
    cordinate.cordY = cordY;
  }

  return cordinate;
}
