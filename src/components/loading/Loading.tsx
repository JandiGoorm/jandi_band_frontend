import styles from "./Loading.module.css";
import ReactDOM from "react-dom";

const Loading = () => {
  return ReactDOM.createPortal(
    <section className={styles.container}>
      <div className={styles.loader} />
    </section>,
    document.getElementById("root") as HTMLElement
  );
};

export default Loading;
