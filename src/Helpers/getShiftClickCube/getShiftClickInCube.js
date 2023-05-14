//Получаем координаты клика на кубике
export default function GetShiftClickInCube(event) {
  const { clientX, clientY } = event;
  const { left, top } = event.target.getBoundingClientRect();

  return {
    shiftX: clientX - left,
    shiftY: clientY - top,
  };
}
