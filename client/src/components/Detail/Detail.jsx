import React from 'react';
import {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {getGameById} from '../../actions';
import styles from './Detail.module.css';
import gif from '../loading-11.gif';


function Detail({id}) {


const gameById = useSelector((state) => state.gameById)
const dispatch = useDispatch()

useEffect(()=>
  dispatch(getGameById(id))

,[dispatch])

if(gameById.length===0){//Si el juego aun no esta que enseñe un gif de "Cargando"
  return <div className={styles.divGif}><img src={gif} alt="Cargando" /></div>
 }else if(gameById.error){
  return <div><h1>{`${gameById.error}`}</h1></div>
 }

if(Array.isArray(gameById)){//Si el juego viene en un arreglo significa que es una peticion a la BD

  return (
    <div className={styles.div}>
      <p className={styles.name}>{gameById[0]?.name}</p>
      <p className={styles.text}>Descripción:</p>
      <div className={styles.text}>{gameById[0]?.description}</div>
      <p className={styles.text}> Fecha de lanzamiento: {gameById[0]?.released}</p>
      <p className={styles.text}> Rating: {gameById[0]?.rating}</p>
      <p className={styles.text}>Plataformas:</p>
      <div className={styles.text}>{gameById[0].Platforms?.map((p)=> <span key={p.name}>|  {p.name}  |</span>)}</div>
      <p className={styles.text}>Generos:</p>
      <div className={styles.text}>{gameById[0].Genres?.map((g)=> <span key={g.name}>|  {g.name}  |</span>)}</div>
    </div>
  )

}else{  //Sino, simplemente en una peticion a la API
  return (
    <div className={styles.div}>
      <img src={gameById?.background_image} alt="Imagen no encontrada" className={styles.img}/>
      <p className={styles.name}>{gameById?.name}</p>
      <p className={styles.text}>Descripción:</p>
      <div className={styles.description} dangerouslySetInnerHTML={{__html:gameById?.description}}></div>
      <p className={styles.text}> Fecha de lanzamiento:</p> <span className={styles.text}>{gameById?.released}</span>
      <p className={styles.text}> Rating:</p> <span className={styles.text}>{gameById?.rating}</span>
      <p className={styles.text}>Plataformas:</p>
      <div className={styles.text}>{gameById.platforms?.map((p)=> <span key={p}>|  {p}  |</span>)}</div>
      <p className={styles.text}>Generos:</p>
      <div className={styles.text}>{gameById.genres?.map((g)=> <span key={g}>|  {g}  |</span>)}</div>
    </div>
  )
}
  
}

export default Detail