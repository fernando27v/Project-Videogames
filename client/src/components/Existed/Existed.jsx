import React from 'react';
import Card from '../Card/Card';
import styles from './Existed.module.css';
import Page from '../Page/Page';
import { useSelector,useDispatch} from 'react-redux';
import {useState,useEffect} from 'react';
import {getVideogames} from '../../actions';

function Existed({paginado}) {
    const dispatch = useDispatch()
    const existed = useSelector((state) => state.existed);
    const arrayFill = useSelector((state)=> state.arrayFill)
    const filterGenres = useSelector((state) => state.filterGenres);
    const filterRating = useSelector((state) => state.filterRating);
    const filterOrder = useSelector((state) => state.filterOrder);
    const [currentPage,setCurrentPage] = useState(1);
    const [videogamesPerPage,setVideogamesPerPage] = useState(15);
    const indexOfLastGame= videogamesPerPage * currentPage
    const indexOfFirstGame= indexOfLastGame - videogamesPerPage 
    var currentGames = existed?.slice(indexOfFirstGame,indexOfLastGame);

    useEffect(()=>{
      dispatch(getVideogames())
      setCurrentPage(1)
      window.scrollTo(0,0);
  },[dispatch,filterGenres,currentPage])

    if(filterGenres != 'all' || filterOrder != 'all' || filterRating != 'all'){

      currentGames = arrayFill?.slice(indexOfFirstGame,indexOfLastGame)
    }//Si hay un cambio entre mis filtros, los juegos renderizados seran los que vienen de mi arreglo filtrado

    const paginate = (number)=>{
        setCurrentPage(number)
      }

      useEffect(()=>{
        dispatch(getVideogames())
        setCurrentPage(1)
        window.scrollTo(0,0);
    },[dispatch,filterGenres,currentPage])//Cada vez que se monte el componente actualizo mis videojuegos

  return (
    <div>
    {paginado && <Page paginate={paginate} allVideoGames={(filterGenres === "all" &&  filterRating === 'all' &&  filterOrder === 'all') ? existed?.length : arrayFill.length} videogamesPerPage={videogamesPerPage}/>}
    <div className={styles.divCards}>
    {currentGames && currentGames.map((vg) => <div key={vg.id} className={styles.card}><Card id={vg.id} name={vg.name} 
    bg={vg.background_image} genres={vg.genres}/></div>)}
    </div>
    {paginado && <Page paginate={paginate} allVideoGames={(filterGenres === "all" &&  filterRating === 'all' &&  filterOrder === 'all') ? existed?.length : arrayFill.length} videogamesPerPage={videogamesPerPage}/>}
    
    </div>
  )
}

export default Existed