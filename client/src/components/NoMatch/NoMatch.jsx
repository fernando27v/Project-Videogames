import React from 'react';
import styles from "./NoMatch.module.css";

function NoMatch() {
  return (
    <div className={styles.div}>
        <h1>Error: 404</h1>
        <h2>Page not found</h2>
    </div>
  )
}

export default NoMatch