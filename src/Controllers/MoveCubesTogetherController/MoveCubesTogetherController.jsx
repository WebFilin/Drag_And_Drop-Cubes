import React from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import store from "../../store/store";
import getShiftClickInCube from "../../Helpers/getShiftClickCube/getShiftClickInCube";
import getSizesCubeTogether from "../../Helpers/getSizesCubeTogether/getSizesCubeTogether";
import checkBorderMain from "../../Helpers/checkBorderMain/checkBorderMain";

const MoveCubesTogetherController = observer(({ cubeWrapper }) => {
  const [shiftClick, setShiftClick] = React.useState({
    shiftX: 0,
    shiftY: 0,
  });

  const eventDragStart = toJS(store.eventDragStart);
  const eventDragEnd = toJS(store.eventDragEnd);

  React.useEffect(() => {
    if (eventDragStart) {
      const { shiftX, shiftY } = getShiftClickInCube(eventDragStart);

      setShiftClick({
        shiftX: shiftX,
        shiftY: shiftY,
      });
    }
  }, [eventDragStart]);

  React.useEffect(() => {
    if (eventDragEnd) {
      const id = Number(eventDragEnd.target.id);

      const { clientX, clientY } = eventDragEnd;
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
    }
  }, [eventDragEnd, cubeWrapper, shiftClick]);

  return <></>;
});

export default MoveCubesTogetherController;
