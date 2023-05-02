import { observer } from "mobx-react-lite";
import field from "../../../store/field";
import bomb from "../../../svg/bomb.svg";
import flag from "../../../svg/flag.svg";
import styles from "./Square.module.css";

export const Square = observer(({ x, y }) => {
  return (
    <div
      onClick={() => {
        if (!field.squares[x][y].flag) {
          field.openSquare(x, y);
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        !field.squares[x][y].open && field.makeFlag(x, y);
      }}
      className={`${styles.square} ${
        field.squares[x][y].open ? styles.open : styles.close
      }`}
    >
      {field.squares[x][y].flag && (
        <img src={flag} alt="flag" className={styles.bomb} />
      )}
      {field.squares[x][y].open &&
        (field.squares[x][y].status === -1 ? (
          <img src={bomb} alt="bomb" className={styles.bomb} />
        ) : (
          field.squares[x][y].status
        ))}
    </div>
  );
});
