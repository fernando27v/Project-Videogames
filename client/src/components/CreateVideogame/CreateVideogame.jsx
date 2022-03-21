import React, { useState , useEffect} from 'react'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import {getGenres,getPlatforms} from '../../actions'
import validate from './validate'
import styles from './CreateVideogame.module.css'


function CreateVideogame() {
  const platforms = useSelector((state) => state.platforms);
  const genres = useSelector((state) => state.genres);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [genre,setGenre] = useState([]);
   const [platform,setPlatform] = useState([]);

  const [input,setInput] = useState({

name: "",
description:"",
released: "",
rating: "",
});
  
  
   useEffect(()=>{
    dispatch(getGenres())
    dispatch(getPlatforms())
    setErrors(validate({             
      ...input}))
},[dispatch])
  





  function handleChange(e){

    if(e.target.name === "genres"){
     //Si el genero ya se encuentra no lo guardo, y lo borro de mi arreglo
      if(!genre.includes(e.target.value)){
        setGenre((state)=> [...state,e.target.value])
      }else{
        setGenre((state)=> state.filter((g)=> g != e.target.value))
      }

    }else if(e.target.name === "platforms"){
           //Si la plataforma ya se encuentra no la guardo, y la borro de mi arreglo
      if(!platform.includes(e.target.value)){
         setPlatform((state)=> [...state,e.target.value])
      }else{
        setPlatform((state)=> state.filter((p)=> p != e.target.value))
      }

    }else{
      setInput((state)=>{
      return {
        ...state,
        [e.target.name]:e.target.value
      }})//Seteo mis inputs

      setErrors(validate({             
      ...input,                  
      [e.target.name]: e.target.value
      }))//Seteo mis errores si los hay

    }
  }


  function ArrayErrors(id){
    if(genre.length === 0  && id === 1){
      return <p className={styles.errors}>Es necesario aunque sea un genero</p>
    }
    if(platform.length === 0 && id === 2){
      return <p className={styles.errors}>Es necesario aunque sea una plataforma</p>
    }
  }//Funcion encargada de mostrar erro si mis arreglos estan vacios

  function isDisabled(){
    if((Object.values(errors)).length>0  || platform.length===0 || genre.length===0){
      return true
    }else{
      return false
    }
  }//Si hay errores, si no hay plataformas o generos cargados deshabilito mi boton de enviar

  async function handleSubmit(e){
    e.preventDefault()
    console.log(input,genre,platform)
    const json = await axios.post('/videogames',{
      name: input.name,
      description:input.description,
      released: input.released,
      rating: input.rating,
      genres: genre,
      platforms: platform
    })  //Envio de formulario 

    setInput({
      name: "",
      description:"",
      released: "",
      rating: ""
    })
    setGenre([])
    setPlatform([])
    // Vaciado de inputs y arreglos


    if(json.error){
      alert(`${json.error}`)
    }else{
      alert("Juego creado correctamente")
    }
  }



  return (
    <div className={styles.div}> 
      <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
        <div className={styles.divInputs}>
        <label htmlFor="" className={styles.labels}>Nombre: </label>
      <input type='text' name='name'  onChange={handleChange} value={input.name}  className={styles.inputs}></input>
      <p className={styles.errors}>{errors.name}</p> 
      </div>
      <div style={{display:"flex", flexDirection:"column",alignItems: "center"}}>
      <div className={styles.divDescription}>
      <label htmlFor="" className={styles.labels}>Descripción: </label>
      <textarea name='description'  onChange={handleChange} value={input.description}  className={styles.inputs}></textarea>
      </div>
      <p className={styles.errors}>{errors.description}</p>
      </div>
      <div className={styles.divInputs}>
      <label htmlFor="" className={styles.labels}>Fecha de lanzamiento: </label>
      <input type='date' name='released' onChange={handleChange} value={input.released}  className={styles.inputs}></input>
      <p className={styles.errors}>{errors.released}</p>
      </div>
      <div className={styles.divInputs}>
      <label htmlFor="" className={styles.labels}>Rating: </label>
      <input type='text' name='rating' onChange={handleChange} value={input.rating}  className={styles.inputs} placeholder="0-5"></input>
      <p className={styles.errors}>{errors.rating}</p>
      </div>
      <div className={styles.divInputs}>
      <label htmlFor="" className={styles.labels}>Generos: </label>
      <select name="genres" onChange={handleChange} className={styles.inputs}>
      {genres? genres.results?.map((g)=> <option key={g.id} value={g.name}>{g.name}</option>) :<option >Generos no encontrados</option>}
      </select>
      <div className={styles.divsArray}>{genre?.map((g)=> {
        return <span key={g} className={styles.text}>|  {g}  |</span>
      })}
      </div> {/*  Mapeo de Generos para enseñarlas de manera legible */}
      
      {ArrayErrors(1)}
      </div>
      <div className={styles.divInputs}>
      <label htmlFor="" className={styles.labels}>Plataformas: </label>
      <select name="platforms" onChange={handleChange} className={styles.inputs}>
      {platforms? platforms.results?.map((p)=> <option key={p.id} value={p.name}>{p.name}</option>) :<option >Plataformas no encontradas</option>}
        </select>
        <div className={styles.divsArray}>{platform?.map((p)=> {
        return <span key={p} className={styles.text}>|  {p}  |</span>
      })}
      </div> {/*  Mapeo de Plataformas para enseñarlas de manera legible */}
      {ArrayErrors(2)}
      </div>
      <button disabled={isDisabled()} className={styles.Button}>Enviar</button>
      </form>
      </div>
  )
}



export default CreateVideogame