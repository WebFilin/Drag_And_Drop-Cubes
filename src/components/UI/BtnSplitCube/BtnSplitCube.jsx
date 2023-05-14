import { observer } from "mobx-react-lite";
import styles from "./btnSplitCube.module.scss";
import store from "../../../store/store";

const BtnSplitCube = observer(() => {
  function handlerClick() {
    store.splitIntersectedCubes();
  }

  return (
    <div onClick={handlerClick} className={styles.wrapper}>
      <div className={styles.body}>Разьеденить</div>
    </div>
  );
});

export default BtnSplitCube;
