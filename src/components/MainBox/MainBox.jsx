import React from "react";
import styless from "./mainBox.module.scss";
import store from "../../store/store";
import { observer } from "mobx-react-lite";
import MoveCubeSeparately from "../MoveCubeSeparately/MoveCubeSeparately";
import MoveCubesTogether from "../MoveCubesTogether/MoveCubesTogether";

const MainBox = observer(() => {
  const mainBoxRef = React.useRef(null);

  //   Получаем размеры контейнера кубиков
  React.useLayoutEffect(() => {
    const { left, top, width, height } =
      mainBoxRef.current.getBoundingClientRect();
    store.getSizeBorderMain(left, top, width, height);
  }, []);

  return (
    <article ref={mainBoxRef} className={styless.wrapper}>
      {store.isIntersect ? <MoveCubesTogether /> : <MoveCubeSeparately />}
    </article>
  );
});

export default MainBox;
