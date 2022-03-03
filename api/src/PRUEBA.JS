require('dotenv').config();
 const axios = require('axios');
// const {Videogame,Genre} = require('./db');


let allGames= [];

 (async ()=>{
    let page=1;
    let allGames= [];
    try{
         while(allGames.length!==100){
            const responseApi = await axios.get(`https://rawg.io/api/games?key=${process.env.API_KEY}?page=${page}`)
        responseApi.data.results.forEach((g)=> allGames.push({
            id:g.id,
            name:g.name,
            released:g.released,
            background_image: g.background_image,
            rating:g.rating,
            platforms: g.platforms.map((p)=> p.platform.name),
            genres: g.genres.map((g)=> g.name)
        }))
        ++page
     }
        const responseDB = await Videogame.findAll()
     }catch(err){
         console.error(err)
     }
     
    })()
    
//     //const response = await Promise.all([`postgres://postgres:fercho3004@:5432/videogames`,`https://rawg.io/api/games?key=f3295137e7774eff9daa4284d4936d8f`])
    
  
    