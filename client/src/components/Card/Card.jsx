import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Card.module.css';

function Card({id , name ,bg ,genres}) {
  return (
    <div className={styles.div}>  
      <Link to={`/home/${id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}v>
      {bg ? <img src={bg} alt="Imagen no encontrada" className={styles.img}/> : <p></p>}
      <p className={styles.name}>{name}</p>
      </Link>
      <div>{genres?.map((g)=> {
      if(typeof g === 'object'){
        return <span key={g.id} className={styles.text}>| {g.name} |</span>
      }else{
        return <span key={g} className={styles.text}>|  {g}  |</span>
      }
      })}</div>
    </div>
  )
}

export default Card