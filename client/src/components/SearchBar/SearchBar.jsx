import {React , useState} from 'react';
import styles from './SearchBar.module.css';


function SearchBar() {
  const [state,setState] = useState("");

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSearch(state);
      setState("")
    }} >
      <input
        type="text"
        placeholder="Juego..."
        className={styles.Input}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className={styles.form}
      />
      <input type="submit" value="Buscar" className={styles.Button} />
    </form>
  )
}

export default SearchBar