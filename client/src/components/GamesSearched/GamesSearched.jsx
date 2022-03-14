import React, { useEffect } from 'react'
import styles from './GamesSearched.module.css'
import {useDispatch,useSelector} from 'react-redux'
import gif from '../loading-11.gif';
import Card from '../Card/Card.jsx'

function GamesSearched() {
    const dispatch = useDispatch()
    const filterGames = useSelector((state) => state.filterGames)
    const filterGenres = useSelector((state) => state.filterGenres)
    const filterOrder = useSelector((state) => state.filterOrder)
    const searchedVideogames = useSelector((state) => state.searchedVideogames)


    
  
  if(searchedVideogames.length===0){ //Enseñar un gif cargando mientras se hace la busqueda
    return <div className={styles.divGif}><img src={gif} alt="Cargando" /></div>
  }else if(searchedVideogames.error){ //Si no se encontró nada, enviar un mensaje
   return <div><h1>{`${searchedVideogames.error}`}</h1></div>
  }else{
    return (
        <div className={styles.divCards}>
        {searchedVideogames?.map((vg) => <div key={vg.id} className={styles.card}><Card id={vg.id} name={vg.name} 
        bg={vg.background_image}  genres={vg.Genres? vg.Genres : vg.genres}/></div>)}
        </div>
  )
  }
    
}


export default GamesSearched