import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Card.module.css';

function Card({id , name ,bg ,genres}) {
  let counter=0
  return (
    <div className={styles.div} key={id} >  
      <Link to={`/home/${id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
      {bg ? <img src={bg} alt="Imagen no encontrada" className={styles.img}/> : <img src="https://blogs.unsw.edu.au/nowideas/files/2019/08/videojuegos-agilidad.jpg" alt="Imagen no encontrada" className={styles.img}/>}
      <p className={styles.name}>{name}</p>
      </Link>
      <div>{genres?.map((g)=> {
      if(typeof g === 'object'){
        return <span key={`${g.name}${counter++}`} className={styles.text}>| {g.name} |</span>
      }else{
        return <span key={`${g}${counter++}`} className={styles.text}>|  {g}  |</span>
      }
      })}</div>
    </div>
  )
}

export default Card