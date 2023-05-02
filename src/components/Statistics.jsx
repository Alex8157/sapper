import { observer } from "mobx-react-lite";
import field from "../store/field";
import styles from "../styles/Statistics.module.css";

export const Statistics = observer(() => {
  return (
    <div className={styles.statistics}>
      <span>Количество клеток: {field.rows * field.columns}</span>
      <span>Количество открытых клеток: {field.numberOpenSquares}</span>
      <span>Количество бомб: {field.numberBombs}</span>
    </div>
  );
});
