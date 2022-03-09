import React from 'react'
import {useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Card from '../Card/Card'
import {getVideogames} from '../../actions';
import gif from '../loading-11.gif'
import styles from './Cards.module.css'

function Cards() {
  const dispatch = useDispatch()
  const allVideoGames = useSelector((state) => state.allVideoGames)
  
  useEffect(()=>{
    dispatch(getVideogames())
},[dispatch])

if((Object.values(allVideoGames)).length===0){
 return <div className={styles.divGif}><img src={gif} alt="Cargando" /></div>
}

  return (
    <div className={styles.div}>
      <span className={styles.text}>Juegos existentes</span>
      <div className={styles.divCards}>
      {allVideoGames.allGames? allVideoGames.allGames.map((vg) => <div key={vg.id} className={styles.card}><Card id={vg.id} name={vg.name} 
      bg={vg.background_image} genres={vg.genres}/></div>)
      : <span>Juegos no encontrados</span>}
      </div>
      <span className={styles.text}>Juegos Creados</span>
      <div className={styles.divCards}>
      {allVideoGames.responseDB? allVideoGames.responseDB.map((vg) => <div key={vg.id} className={styles.card}><Card id={vg.id} name={vg.name} 
      genres={vg.Genres}/></div>)
      : <span>Juegos no encontrados</span>}
      </div>
    </div>
  )
}

export default Cards