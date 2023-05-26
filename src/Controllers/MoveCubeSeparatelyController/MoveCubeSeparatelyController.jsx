import React from "react";
import getCordinateElem from "../../Helpers/getCordinateElem/getCordinateElem";
import getShiftClickInCube from "../../Helpers/getShiftClickCube/getShiftClickInCube";
import Cube from "../../components/Cube/Cube";
import store from "../../store/store";
import { observer } from "mobx-react-lite";

const MoveCubeSeparatelyController = observer(
  ({
    id,
    startShiftX,
    startShiftY,
    widthBox,
    heightBox,
    boxColor,
    selected,
    cordDropX,
    cordDropY,
  }) => {
    //Координаты клика на элементе
    const [shiftClick, setShiftClick] = React.useState({
      shiftX: 0,
      shiftY: 0,
    });

    //Стартовая позция элементов
    React.useLayoutEffect(() => {
      const { left, top } = store.mainBoxSize;

      const cordX = left + startShiftX;
      const cordY = top + startShiftY;

      //  Сохраняем первоначальные координаты в стор
      store.saveCordinateCube(id, cordX, cordY);
    }, [id, startShiftY, startShiftX]);

    //Получаем координаты клика на кубике
    function handlerClickPosition(event) {
      const { shiftX, shiftY } = getShiftClickInCube(event);

      setShiftClick({
        shiftX: shiftX,
        shiftY: shiftY,
      });
      return false;
    }

    const handleDragEnd = React.useCallback(
      (event) => {
        const { cordX, cordY } = getCordinateElem(
          event,
          store.mainBoxSize,
          widthBox,
          shiftClick,
          cordDropX,
          cordDropY
        );

        store.saveCordinateCube(id, cordX, cordY);
        store.checIntersectsCube(id, cordX, cordY, widthBox, heightBox);
      },
      [id, widthBox, heightBox, cordDropX, cordDropY, shiftClick]
    );

    return (
      <>
        <Cube
          id={id}
          widthBox={widthBox}
          heightBox={heightBox}
          startShiftX={startShiftX}
          startShiftY={startShiftY}
          moveX={cordDropX}
          moveY={cordDropY}
          boxColor={boxColor}
          handlerClickPosition={handlerClickPosition}
          dragEnd={handleDragEnd}
          selected={selected}
        />
      </>
    );
  }
);

export default MoveCubeSeparatelyController;
