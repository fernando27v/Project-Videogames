import React from 'react';
import styles from './Created.module.css';
import Card from '../Card/Card';
import { useSelector,useDispatch} from 'react-redux';
import {useState,useEffect} from 'react';
import Page from '../Page/Page';
import {getVideogames} from '../../actions';

function Created({paginado}) {
    const dispatch = useDispatch()
    const created = useSelector((state) => state.created);
    const arrayFill = useSelector((state)=> state.arrayFill)
    const filterGenres = useSelector((state) => state.filterGenres);
    const filterRating = useSelector((state) => state.filterRating);
    const filterOrder = useSelector((state) => state.filterOrder);
    const [currentPage,setCurrentPage] = useState(1);
    const [videogamesPerPage,setVideogamesPerPage] = useState(15);
    const indexOfLastGame= videogamesPerPage * currentPage;
    const indexOfFirstGame= indexOfLastGame - videogamesPerPage;
    var currentGamesDB = created?.slice(indexOfFirstGame,indexOfLastGame);
    
    useEffect(()=>{
      dispatch(getVideogames())
      setCurrentPage(1)
  },[dispatch,filterGenres])//Cada vez que se monte el componente actualizo mis videojuegos

    useEffect(()=>{
      window.scrollTo(0,0);
  },[currentPage])

    if(created.length===0){
      return (
        <div>
        <h1>No se han creado videojuegos aun</h1>
        </div>
      )
    }
   
    if(filterGenres != 'all' || filterOrder != 'all' || filterRating != 'all'){
  
      currentGamesDB = arrayFill?.slice(indexOfFirstGame,indexOfLastGame)
    }//Si hay un cambio entre mis filtros, los juegos renderizados seran los que vienen de mi arreglo filtrado

    const paginate = (number)=>{
        setCurrentPage(number)
      }

    

  return (<div>
    {paginado && <Page paginate={paginate} allVideoGames={(filterGenres === "all" &&  filterRating === 'all' &&  filterOrder === 'all') ? created?.length : arrayFill.length} videogamesPerPage={videogamesPerPage}/>}
    <div className={styles.divCards}>
    {currentGamesDB && currentGamesDB.map((vg) => <div key={vg.id} className={styles.card}><Card id={vg.id} name={vg.name} 
    genres={vg.Genres}/></div>)}
    </div>
    {paginado && <Page paginate={paginate} allVideoGames={(filterGenres === "all" &&  filterRating === 'all' &&  filterOrder === 'all') ? created?.length : arrayFill.length} videogamesPerPage={videogamesPerPage}/>}
    </div>
  )
}

export default Created