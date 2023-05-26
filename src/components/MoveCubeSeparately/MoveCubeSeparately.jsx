import { observer } from "mobx-react-lite";
import MoveCubeSeparatelyController from "../../Controllers/MoveCubeSeparatelyController/MoveCubeSeparatelyController";
import store from "../../store/store";

const MoveCubeSeparately = observer(() => {
  return (
    <section>
      {store.arrCubes.map(
        ({
          id,
          widthBox,
          heightBox,
          startShiftX,
          startShiftY,
          boxColor,
          selected,
          cordDropX,
          cordDropY,
        }) => {
          return (
            <MoveCubeSeparatelyController
              key={id}
              id={id}
              widthBox={widthBox}
              heightBox={heightBox}
              startShiftX={startShiftX}
              startShiftY={startShiftY}
              cordDropX={cordDropX}
              cordDropY={cordDropY}
              boxColor={boxColor}
              selected={selected}
            />
          );
        }
      )}
    </section>
  );
});

export default MoveCubeSeparately;
