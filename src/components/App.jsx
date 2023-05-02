import { Settings } from "./Settings";
import { Field } from "./Field";
import { Statistics } from "./Statistics";
import styles from "../styles/App.module.css";

export const App = () => {
  return (
    <div className={styles.App}>
      <Settings />
      <Field />
      <Statistics />
    </div>
  );
};
