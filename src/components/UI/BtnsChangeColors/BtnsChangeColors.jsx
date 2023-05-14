import { observer } from "mobx-react-lite";
import styles from "./btnsChangeColors.module.scss";
import store from "../../../store/store";

const BtnsChangeColors = observer(() => {
  function handlerClick(color) {
    store.setColorCube(color);
  }

  return (
    <div className={styles.wrapper}>
      <h5 className={styles.title}>Выбери цвет</h5>
      <div className={styles.body}>
        {store.arrColors.map(({ id, color }) => {
          return (
            <div
              onClick={() => handlerClick(color)}
              className={styles.btn}
              style={{ background: color }}
              key={id}
            ></div>
          );
        })}
      </div>
    </div>
  );
});

export default BtnsChangeColors;
