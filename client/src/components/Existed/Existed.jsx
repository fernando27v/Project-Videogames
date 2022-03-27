import React from 'react';
import Card from '../Card/Card';
import styles from './Existed.module.css';
import Page from '../Page/Page';
import {useHistory} from 'react-router-dom'
import { useSelector,useDispatch} from 'react-redux';
import {useState,useEffect} from 'react';
import {getVideogames} from '../../actions';

function Existed({paginado}) {
    const dispatch = useDispatch();
    const history = useHistory();
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
      setCurrentPage(1);
      history.push("/home?page=1");
  },[filterGenres])//Cada vez que haya un cambio de genero vuelvo a mi pagina 1

    useEffect(()=>{
      dispatch(getVideogames())
  },[dispatch])//Cada vez que se monte el componente actualizo mis videojuegos

    useEffect(()=>{
      window.scrollTo(0,0);
  },[currentPage])//Cada vez que cambie de pagina vuelve al comienzo de mi web

    if(filterGenres != 'all' || filterOrder != 'all' || filterRating != 'all'){

      currentGames = arrayFill?.slice(indexOfFirstGame,indexOfLastGame)
    }//Si hay un cambio entre mis filtros, los juegos renderizados seran los que vienen de mi arreglo filtrado

    const paginate = (number)=>{
        setCurrentPage(number)
      }

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