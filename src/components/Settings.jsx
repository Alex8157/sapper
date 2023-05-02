import { observer } from "mobx-react-lite";
import { useState } from "react";
import field from "../store/field";
import styles from "../styles/Settings.module.css";

export const Settings = observer(() => {
  const [rows, changeRows] = useState(field.rows);
  const [columns, changeColumns] = useState(field.columns);
  const [complexity, changeComplexity] = useState(field.complexity);

  const handleСhangeRows = (value) => {
    const number = Math.min(Math.max(rows + value, 10), 25);
    changeRows(number);
  };

  const handleСhangeColumns = (value) => {
    const number = Math.min(Math.max(columns + value, 10), 25);
    changeColumns(number);
  };

  const start = () => {
    field.changeSize(rows, columns);
    field.changeComplexity(complexity);
    field.makeSquares();
  };

  return (
    <div className={styles.settings}>
      <span>Сложность:</span>
      <div className={styles.row}>
        <select onChange={(e) => changeComplexity(e.target.value)}>
          <option value={0.1}>Легко</option>
          <option value={0.15}>Средне</option>
          <option value={0.2}>Трудно</option>
          <option value={0.3}>Очень трудно</option>
        </select>
      </div>
      <div className={styles.row}>
        <span>Высота:</span>
        <span>Ширина:</span>
      </div>
      <div className={styles.row}>
        <div className={styles.row}>
          <button className={styles.sign} onClick={() => handleСhangeRows(-1)}>
            -
          </button>
          <span>{rows}</span>
          <button className={styles.sign} onClick={() => handleСhangeRows(+1)}>
            +
          </button>
        </div>
        <div className={styles.row}>
          <button
            className={styles.sign}
            onClick={() => handleСhangeColumns(-1)}
          >
            -
          </button>
          <span>{columns}</span>
          <button
            className={styles.sign}
            onClick={() => handleСhangeColumns(+1)}
          >
            +
          </button>
        </div>
      </div>
      <div className={styles.row}>
        <button className={styles.start} onClick={start}>
          Играть
        </button>
      </div>
    </div>
  );
});
