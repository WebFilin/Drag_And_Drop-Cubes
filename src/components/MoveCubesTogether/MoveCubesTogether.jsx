import React, { useCallback } from "react";
import { observer } from "mobx-react-lite";
import Cube from "../Cube/Cube";
import store from "../../store/store";
import getShiftClickInCube from "../../Helpers/getShiftClickCube/getShiftClickInCube";
import getSizesCubeTogether from "../../Helpers/getSizesCubeTogether/getSizesCubeTogether";
import checkBorderMain from "../../Helpers/checkBorderMain/checkBorderMain";

const MoveCubesTogether = observer(() => {
  const cubeWrapper = React.useRef();

  const [shiftClick, setShiftClick] = React.useState({
    shiftX: 0,
    shiftY: 0,
  });

  function handlerClickPosition(event) {
    const { shiftX, shiftY } = getShiftClickInCube(event);

    setShiftClick({
      shiftX: shiftX,
      shiftY: shiftY,
    });
  }

  const handleDragEnd = useCallback(
    (event) => {
      const id = Number(event.target.id);

      const { clientX, clientY } = event;
      const { shiftX, shiftY } = shiftClick;

      const cordX = clientX - shiftX;
      const cordY = clientY - shiftY;

      const { height, width } = getSizesCubeTogether(cubeWrapper);

      const bottomShift = height - store.heightCube;

      const borderCheked = checkBorderMain(
        store.mainBoxSize,
        cordX,
        cordY,
        width,
        bottomShift
      );

      if (borderCheked) {
        store.setCordinateMoveTogether(id, cordX, cordY);
      }
    },
    [shiftClick]
  );

  return (
    <section ref={cubeWrapper}>
      {store.arrCubes.map(
        ({
          id,
          widthBox,
          heightBox,
          cordDropX,
          cordDropY,
          boxColor,
          selected,
        }) => (
          <Cube
            key={id}
            id={id}
            widthBox={widthBox}
            heightBox={heightBox}
            moveX={cordDropX}
            moveY={cordDropY}
            boxColor={boxColor}
            handlerClickPosition={handlerClickPosition}
            handleDragEnd={handleDragEnd}
            selected={selected}
          />
        )
      )}
    </section>
  );
});

export default MoveCubesTogether;
