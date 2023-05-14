import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./btnsWrapper.module.scss";
import BtnsChangeColors from "../UI/BtnsChangeColors/BtnsChangeColors";
import BtnSplitCube from "../UI/BtnSplitCube/BtnSplitCube";
const BtnsWrapper = observer(() => {
  return (
    <aside className={styles.wrapper}>
      <BtnsChangeColors />
      <BtnSplitCube />
    </aside>
  );
});

export default BtnsWrapper;
