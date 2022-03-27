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
  //<Redirect to="/home?page=1"/>
}

if(e.target.name === "order"){
  dispatch(setFilterOrder(e.target.value))
}

if(e.target.name === "games"){
  dispatch(setFilterGames(e.target.value))
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
      <div className={styles.divIcons}>
        <div className={styles.divLogo}>
        <Link to='/home' style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <span className={styles.proyect}>P</span>
        <img src={logo} alt="Imagen no encontrada"  />
        <span className={styles.proyect}>V</span>
        </Link> 
       </div>
       <button className={styles.ButtonsCreate} name="buttonR" onClick={handleChange}>Cargar Videojuegos</button>
       <Link to='/home/create/videogame'><button className={styles.ButtonsCreate}>Crear Videojuego</button></Link>
      </div>
      
      <div className={styles.div}>
    
      
               <label htmlFor="" className={styles.label}>
          Filtrar por:
          </label>
        <select name="genres" id="" className={styles.selects} onChange={handleChange} style={{width: "144px"}}>
        <option value="all">Genero</option>
          {genres? genres.results?.map((g)=> <option key={g.id} value={g.name}>{g.name}</option>) :<option >Generos no encontrados</option>}
        </select> 
        <select name="games" id="" className={styles.selects} onChange={handleChange}>
        <option value="all">Todos</option>
          <option value="created">Creados</option>
          <option value="existed">Existentes</option>
        </select>
        <label htmlFor="" className={styles.label}>
          Ordenar por:
          </label>
        <select name="order" id="" className={styles.selects} onChange={handleChange}>
      <option value="all">Orden</option>
          <option value="a_z">A-Z</option>
          <option value="z_a">Z-A</option>
          <option value="0_5">Menor Rating</option>
          <option value="5_0">Mayor Rating</option>
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