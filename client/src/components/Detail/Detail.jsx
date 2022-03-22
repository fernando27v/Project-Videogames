import React from 'react';
import {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {getGameById,deleteDetail} from '../../actions';
import styles from './Detail.module.css';
import gif from '../loading-11.gif';
import axios from "axios";


function Detail({id}) {


const gameById = useSelector((state) => state.gameById)
const dispatch = useDispatch()

useEffect(()=> {
  dispatch(getGameById(id));
  return ()=>{dispatch(deleteDetail())};
}
,[dispatch])

async function handleDelete(e){
  e.preventDefault()
 const response = await axios.get(`/videogameDelete/${id}`)
  if(response.data.response){
    alert(`${response.data.response}`)
  }else{
    alert("Error al borrar el juego")
  }
}



if(gameById.length===0){//Si el juego aun no esta que enseñe un gif de "Cargando"
  return <div className={styles.divGif}><img src={gif} alt="Cargando" /></div>
 }else if(gameById.error){
  return <div><h1>{`${gameById.error}`}</h1></div>
 }

if(Array.isArray(gameById)){//Si el juego viene en un arreglo significa que es una peticion a la BD

  return (
    <div className={styles.div}  style={{backgroundImage: `url("${gameById[0].bg}")`}}>
      {isNaN(id) && <button className={styles.button} onClick={handleDelete}>X</button>}
      <p className={styles.name}>{gameById[0]?.name}</p>
      <div className={gameById[0]?.description.length <100 ? styles.bigDiv2 : styles.bigDiv}>
      <div className={gameById[0]?.description.length <100 ? styles.description2 : styles.description}>{gameById[0]?.description}</div>
        <div className={styles.divs}>
        <div className={styles.divFila}>
      <p className={styles.text}> Fecha de lanzamiento: {gameById[0]?.released}</p>
      </div>
      <div className={styles.divFila}></div>
      <p className={styles.text}> Rating: {gameById[0]?.rating}</p>
      </div>
      <div className={styles.miniDivs}>
      <p className={styles.text}>Plataformas:</p>
      <div className={styles.text}>{gameById[0].Platforms?.map((p)=> <span key={p.name}>|  {p.name}  |</span>)}</div>
      </div>
      <div className={styles.miniDivs}>
      <p className={styles.text}>Generos:</p>
      <div className={styles.text}>{gameById[0].Genres?.map((g)=> <span key={g.name}>|  {g.name}  |</span>)}</div>
      </div>
       </div>
    </div>
  )

}else{  //Sino, simplemente en una peticion a la API
  return (
    <div className={styles.div} style={{backgroundImage: `url("${gameById.background_image}")`}}>
      <p className={styles.name}>{gameById?.name}</p>
      <div className={styles.bigDiv}>
      <div className={styles.description} dangerouslySetInnerHTML={{__html:gameById?.description}}></div>
      <div className={styles.divs}>
        <div className={styles.divFila}>
        <p className={styles.text}> Fecha de lanzamiento:</p> <span className={styles.text}>{gameById?.released} &#128197;</span>
      </div>
      <div className={styles.divFila}>
        <p className={styles.text}> Rating:</p> <span className={styles.text}>{gameById?.rating} ⭐</span>
      </div>
      <div className={styles.miniDivs}>
         <p className={styles.text}>Plataformas:</p>
      <div className={styles.text}>{gameById.platforms?.map((p)=> <span key={p}>|  {p}  |</span>)}</div>
      </div>
      <div className={styles.miniDivs}>
         <p className={styles.text}>Generos:</p>
      <div className={styles.text}>{gameById.genres?.map((g)=> <span key={g}>|  {g}  |</span>)}</div>
      </div>
      </div>
      </div>
    </div>
  )
}
  
}

export default Detail