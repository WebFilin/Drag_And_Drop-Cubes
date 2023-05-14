/* eslint-disable react/prop-types */
import React from "react";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
const Cube = observer(
  ({
    id,
    widthBox,
    heightBox,
    boxColor,
    moveX,
    moveY,
    handleDragEnd,
    handlerClickPosition,
    selected,
  }) => {
    const styles = React.useMemo(
      () => ({
        position: "fixed",
        width: `${widthBox}px`,
        height: `${heightBox}px`,
        left: moveX,
        top: moveY,
        background: boxColor,
        boxShadow: "4px 4px 6px 0px rgba(34, 60, 80, 0.5)",
        cursor: "grab",
        border: selected ? "2px dashed red" : "",
      }),
      [widthBox, heightBox, boxColor, moveX, moveY, selected]
    );

    function handlerClick(event) {
      const id = Number(event.target.id);
      store.selectedCube(id);
    }

    return (
      <div
        id={id}
        data-elem="cube"
        draggable
        onDragEnd={handleDragEnd}
        onMouseDown={handlerClickPosition}
        onClick={handlerClick}
        style={styles}
      ></div>
    );
  }
);

export default Cube;
