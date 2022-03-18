import React from 'react';
import Page from '../Page/Page.jsx';
import {useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {getVideogames} from '../../actions';
import Card from '../Card/Card.jsx';
import styles from './All.module.css';

function All() {

    const dispatch = useDispatch();
  const totalVideogames = useSelector((state) => state.totalVideogames);
  const filterGenres = useSelector((state) => state.filterGenres);
  const filterOrder = useSelector((state) => state.filterOrder);
  const filterRating = useSelector((state) => state.filterRating);
  const [currentPage,setCurrentPage] = useState(1);
  const [videogamesPerPage,setVideogamesPerPage] = useState(15);
  const indexOfLastGame= videogamesPerPage * currentPage;
  const indexOfFirstGame= indexOfLastGame - videogamesPerPage;
  const arrayFill = useSelector((state)=> state.arrayFill)

  var currentGames = totalVideogames?.slice(indexOfFirstGame,indexOfLastGame)
  //Por defecto
  useEffect(()=>{
    setCurrentPage(1);
},[filterGenres])//Cada vez que haya un cambio de genero vuelvo a mi pagina 1
    
  useEffect(()=>{
    dispatch(getVideogames())
},[dispatch])//Cada vez que se monte el componente actualizo mis videojuegos

useEffect(()=>{
  window.scrollTo(0,0);
},[currentPage])//Cada vez que cambie de pagina vuelve al comienzo de mi web

  const paginate = (number)=>{
    setCurrentPage(number)
  }
  
  if(filterGenres != 'all' || filterOrder != 'all' || filterRating != 'all'){
    currentGames = arrayFill?.slice(indexOfFirstGame,indexOfLastGame)
  }//Si hay un cambio entre mis filtros, los juegos renderizados seran los que vienen de mi arreglo filtrado

  
 

  return (
      <div>
      <Page paginate={paginate} allVideoGames={(filterGenres === "all" && filterRating === 'all' && filterOrder === 'all') ? totalVideogames.length : arrayFill.length} 
    videogamesPerPage={videogamesPerPage}/>
    <div className={styles.divCards}>
        {currentGames && currentGames.map((vg)=> <div key={vg.id} className={styles.card}><Card id={vg.id} name={vg.name} 
    bg={vg.background_image} genres={vg.genres? vg.genres : vg.Genres}/></div>)}
    </div>
    <Page paginate={paginate} allVideoGames={(filterGenres === "all" &&  filterRating === 'all' && filterOrder === 'all') ? totalVideogames.length : arrayFill.length} 
    videogamesPerPage={videogamesPerPage}/>
    </div>
  )
}

export default All