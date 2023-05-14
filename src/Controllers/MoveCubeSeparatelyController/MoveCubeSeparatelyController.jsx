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
  }) => {
    // Позиция элемента
    const [position, setPosition] = React.useState({ x: 0, y: 0 });

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

      setPosition({
        x: cordX,
        y: cordY,
      });

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
    }

    const handleDragEnd = React.useCallback(
      (event) => {
        const { cordX, cordY } = getCordinateElem(
          event,
          store.mainBoxSize,
          widthBox,
          shiftClick,
          position
        );

        setPosition({ x: cordX, y: cordY });
        store.saveCordinateCube(id, cordX, cordY);
        store.checIntersectsCube(id, cordX, cordY, widthBox, heightBox);
      },
      [id, widthBox, heightBox, position, shiftClick]
    );

    return (
      <div>
        <Cube
          id={id}
          widthBox={widthBox}
          heightBox={heightBox}
          startShiftX={startShiftX}
          startShiftY={startShiftY}
          moveX={position.x}
          moveY={position.y}
          boxColor={boxColor}
          handlerClickPosition={handlerClickPosition}
          handleDragEnd={handleDragEnd}
          selected={selected}
        />
      </div>
    );
  }
);

export default MoveCubeSeparatelyController;
