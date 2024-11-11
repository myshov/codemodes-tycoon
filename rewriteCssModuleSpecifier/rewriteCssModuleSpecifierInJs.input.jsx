import { useState } from "react";

import "./styles.module.css";
import styles from "./other_styles.module.css";

export default function Component() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className={styles.counter}>{count}</div>
      <br />
      <button onClick={() => setCount(++count)}>
        Increment counter
      </button>
    </>
  );
}
