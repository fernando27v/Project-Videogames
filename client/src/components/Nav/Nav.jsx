import React from 'react'
import {useEffect} from 'react'
import logo from './home.png'
import {Link} from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import styles from './Nav.module.css'
import {getGenres} from '../../actions'
import {useSelector , useDispatch} from 'react-redux'

function Nav({onSearch}) {

  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

useEffect(()=>{
    dispatch(getGenres())
},[dispatch])

  return (
    <nav className={styles.Nav}>
      <div>
        <Link to='/home'><img src={logo} alt="Imagen no encontrada" /></Link>
      </div>
      <Link to='/home/create/videogame'><button className={styles.ButtonsCreate}>Crear Videojuego</button></Link>
      <div>
        <label htmlFor="" className={styles.label}>
          Filtrar por:
          </label>
      <select name="orden" id="" className={styles.selects}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select name="genres" id="" className={styles.selects}>
        <option value="all">Todos</option>
          {genres? genres.results?.map((g)=> <option key={g.id} value={g.name}>{g.name}</option>) :<option >Generos no encontrados</option>}
        </select>

        <select name="games" id="" className={styles.selects}>
          <option value="all">Todos</option>
          <option value="created">Creados</option>
          <option value="existed">Existentes</option>
        </select>
  
        </div>

      <div>
        <SearchBar onSearch={onSearch}/>
      </div>
    </nav>
  )
}

export default Nav