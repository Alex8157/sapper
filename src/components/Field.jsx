import { observer } from "mobx-react-lite";
import { Square } from "./UI/square/Square";
import field from "../store/field";
import styles from "../styles/Field.module.css";

export const Field = observer(() => {
  return (
    <div className={styles.field} onContextMenu={(e) => e.preventDefault()}>
      {field.squares.map((row, x) => (
        <div key={x} className={styles.row}>
          {row.map((square, y) => (
            <Square key={`${x},${y}`} x={x} y={y} />
          ))}
        </div>
      ))}
      {(!field.play || field.win) && (
        <div className={styles.popUp}>
          {field.win ? <h1>Вы выиграли!</h1> : <h1>Вы проиграли</h1>}
        </div>
      )}
    </div>
  );
});
