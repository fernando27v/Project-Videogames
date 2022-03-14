import React from 'react'
import {useEffect,useState} from 'react'
import logo from './home.png'
import {Link,Redirect} from 'react-router-dom'
import styles from './Nav.module.css'
import {getGenres,setFilterGames,setFilterOrder,setFilterGenres,onSearch,getVideogames, setFilterRating} from '../../actions'
import {useSelector , useDispatch} from 'react-redux'

function Nav() {
  const genres = useSelector((state) => state.genres);
  const [state,setState] = useState("");
  const dispatch = useDispatch();
  const [flag,setFlag] = useState(false);

useEffect(()=>{
    dispatch(getGenres())
},[dispatch])

function handleChange(e){
e.preventDefault();

if(e.target.name === "buttonR"){
  dispatch(getVideogames())
}
if(e.target.name === "genres"){
  dispatch(setFilterGenres(e.target.value))
}

if(e.target.name === "orderAlf"){
  dispatch(setFilterOrder(e.target.value))
}

if(e.target.name === "games"){
  dispatch(setFilterGames(e.target.value))
}

if(e.target.name === "orderByRating"){
  dispatch(setFilterRating(e.target.value))
}

}

function handleSubmit(e){
  e.preventDefault();
  if(state === ""){
    alert(`El Input "Buscar juego..." no puede estar vacio`)
  }else{
    dispatch(onSearch(state));
    setState("");
     setFlag(true)
  }
}

  return (
    <nav className={styles.Nav}>
      <div style={{display:"flex"}}>
        <Link to='/home' ><img src={logo} alt="Imagen no encontrada"  /></Link>
       <button className={styles.ButtonsCreate} name="buttonR" onClick={handleChange}>Cargar Videojuegos</button>
       <Link to='/home/create/videogame'><button className={styles.ButtonsCreate}>Crear Videojuego</button></Link>
      </div>
      
      <div className={styles.div}>
        <label htmlFor="" className={styles.label}>
          Filtrar por:
          </label>
      <select name="orderAlf" id="" className={styles.selects} onChange={handleChange}>
      <option value="all">Orden</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select name="orderByRating" id="" className={styles.selects} onChange={handleChange}>
      <option value="all">Rating</option>
          <option value="asc">0-5</option>
          <option value="desc">5-0</option>
        </select>
        <select name="genres" id="" className={styles.selects} onChange={handleChange}>
        <option value="all">Genero</option>
          {genres? genres.results?.map((g)=> <option key={g.id} value={g.name}>{g.name}</option>) :<option >Generos no encontrados</option>}
        </select>

        <select name="games" id="" className={styles.selects} onChange={handleChange}>
        <option value="all">Todos</option>
          <option value="created">Creados</option>
          <option value="existed">Existentes</option>
        </select>
  
        </div>

      <div>
      {flag && <Redirect to="/home/search/videogames"/>}
      <form  onSubmit={handleSubmit} onChange={(e) => setFlag(false)} className={styles.form}>
      <input
        type="text"
        placeholder="Buscar juego..."
        value={state}
        onChange={(e) => setState(e.target.value)}
        className={styles.input}
      />
    <input type="submit"  value ='&#128270;' className={styles.Button}/>
      </form>
      </div>
    </nav>
  )
}

export default Nav