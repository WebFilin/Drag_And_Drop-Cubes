import React from "react";
import { observer } from "mobx-react-lite";
import Cube from "../Cube/Cube";
import store from "../../store/store";
import MoveCubesTogetherController from "../../Controllers/MoveCubesTogetherController/MoveCubesTogetherController";

const MoveCubesTogether = observer(() => {
  const cubeWrapper = React.useRef();

  function handlerClickPosition(event) {
    store.getClickPosition(event);
  }

  function handleDragEnd(event) {
    store.getEventDragEnd(event);
  }

  return (
    <>
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
              dragEnd={handleDragEnd}
              selected={selected}
            />
          )
        )}
      </section>
      <MoveCubesTogetherController cubeWrapper={cubeWrapper} />
    </>
  );
});

export default MoveCubesTogether;
