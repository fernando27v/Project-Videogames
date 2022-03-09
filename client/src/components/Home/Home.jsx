import React from 'react'
import {useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getVideogames} from '../../actions';
import {Link, Route} from 'react-router-dom';
import Nav from '../Nav/Nav'
import styles from './Home.module.css';
import Cards from '../Cards/Cards';
import Detail from '../Detail/Detail';
import CreateVideogame from '../CreateVideogame/CreateVideogame'

function Home() {
const dispatch = useDispatch();
const allVideogames = useSelector((state) => state.allVideogames)

  return (
    <div className={styles.Home}>
      <div>
      <Route path='/' component={Nav}/>
      <div className={styles.cards}>
        <Route exact path='/home' component={Cards}/>
        <Route exact path='/home/:id' render={({match})=> <Detail id={match.params.id}/>}/>
        <Route exact path='/home/create/videogame' component={CreateVideogame}/>
     </div> 
      </div>
    </div>
  )
}

export default Home