import React from 'react'
import {Route} from 'react-router-dom';
import Nav from '../Nav/Nav'
import styles from './Home.module.css';
import Cards from '../Cards/Cards';
import Detail from '../Detail/Detail';
import CreateVideogame from '../CreateVideogame/CreateVideogame'
import GamesSearched from '../GamesSearched/GamesSearched';

function Home() {



  return (
    <div className={styles.Home}>
      <div>
      <Route path='/' component={Nav}/>
      <div className={styles.cards}>
        <Route exact path='/home' component={Cards}/>
        <Route exact path='/home/:id' render={({match})=> <Detail id={match.params.id}/>}/>
        <Route exact path='/home/create/videogame' component={CreateVideogame}/>
        <Route exact path='/home/search/videogames' component={GamesSearched}/>
     </div> 
      </div>
    </div>
  )
}

export default Home