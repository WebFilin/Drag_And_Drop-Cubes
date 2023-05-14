import styless from "./app.module.scss";
import MainBox from "../MainBox/MainBox";
import BtnsWrapper from "../BtnsWrapper/BtnsWrapper";
function App() {
  return (
    <main className={styless.wrapper}>
      <MainBox />
      <BtnsWrapper />
    </main>
  );
}

export default App;
