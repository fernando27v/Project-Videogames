import React from 'react'
import {useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {getVideogames,getGames} from '../../actions';
import gif from '../loading-11.gif';
import styles from './Cards.module.css';
import Created from '../Created/Created';
import Existed from '../Existed/Existed';
import All from '../All/All';

function Cards() {

  const dispatch = useDispatch();
  const allVideoGames = useSelector((state)=> state.allVideoGames)
  const filterGames = useSelector((state) => state.filterGames)
  const filterOrder = useSelector((state) => state.filterOrder)

  useEffect(()=>{
    dispatch(getVideogames())
},[dispatch])


if(allVideoGames.length===0){
  return <div className={styles.divGif}><img src={gif} alt="Cargando" /></div>
 }

  return (
    <div className={styles.div}>
      {filterGames === "existed" && <Existed paginado={true}/>}
      {filterGames === "created" && <Created paginado={true}/>}
      {(filterGames === "all" )  && <All/>}
    </div>
  )
}

export default Cards