const axios  = require('axios');
require('dotenv').config();
const {Videogame,Videogame_Platforms,Videogame_Genres,Platform,Genre} = require('../db');
const {API_KEY} = process.env;
const {Op} = require('sequelize')





async function getGames(req,res){
    let page=1;
    let allGames= [];
    let GamesByName=[];
    const {name} = req.query;

    try{    
        if(name){// Si llego un nombre por query, guardo los resultados de mis promesas en variables
        const responseDBName = await Videogame.findAll({where:{name:{[Op.iLike]:`%${name}%`}},include:[{model:Genre,attributes:["name"],through:{attributes:[]}},
        {model:Platform,attributes:["name"],through:{attributes:[]}}]})
        const responseApiName = await axios.get(`https://rawg.io/api/games?key=${API_KEY}&search=${name}`)
        if(responseApiName.data.count > 0 || responseDBName.length > 0){ 
            
            if(responseApiName.data.count > 0){
                const results = responseApiName.data.results.slice(0,15)
                 results.forEach((g)=> GamesByName.push({
                    id:g.id,
                    name:g.name,
                    released:g.released,
                    background_image: g.background_image,
                    rating:g.rating,
                    platforms: g.platforms.map((p)=> p.platform.name),
                    genres: g.genres.map((g)=> g.name)
                }))
            }
                
            if(responseDBName.length > 0){
                responseDBName.map((r)=> GamesByName.unshift(r))
            }
             res.json(GamesByName)

            }else{
            res.json({error: "Videojuego no encontrado"})
            }
        }

        
        
        while(allGames.length!==100){
           const responseApi = await axios.get(`https://rawg.io/api/games?key=${API_KEY}&page=${page}`)
            responseApi.data.results.forEach((g)=> allGames.push({
           id:g.id,
           name:g.name,
           background_image: g.background_image,
           rating: g.rating,
           platforms: g.platforms.map((p)=> p.platform.name),
           genres: g.genres.map((g)=> g.name)
       }))
       ++page
    }
       const responseDB = await Videogame.findAll({include:[{model:Genre,attributes:["name"],through:{attributes:[]}},
                                                        {model:Platform,attributes:["name"],through:{attributes:[]}}]})
                                                    

       
       res.status(200).json({allGames,responseDB})
    
    }catch(err){
        res.send(err)
    }
}

async function getGamesById(req,res){
    const {id}= req.params

    try{
        if(isNaN(id)){
            const responseDBId = await Videogame.findAll({where:{id:id},include:[{model:Genre,attributes:["name"],through:{attributes:[]}},
            {model:Platform,attributes:["name"],through:{attributes:[]}}]})

            res.json(responseDBId)
        }else{
            const responseApiId = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        if(responseApiId.data){
            res.status(200).json({
            id:responseApiId.data.id,
            name:responseApiId.data.name,
            description:responseApiId.data.description,
            released:responseApiId.data.released,
            background_image: responseApiId.data.background_image_additional,
            rating:responseApiId.data.rating,
            platforms: responseApiId.data.platforms.map((p)=> p.platform.name),
            genres: responseApiId.data.genres.map((g)=> g.name)
        })}

        }

    

    }catch(err){
        res.json({error: "Videojuego no encontrado"})
    }
        
        
       
     

}


async function postGames(req,res){
    const {name,description, rating, released,genres,platforms} = req.body


try{
    if(name==="" || description===""){ //Datos nulos, si no se envian a la DB lanzar un error
        res.json({error:"Datos enviados incorrectamente"})
    }else if(released === ""){ // Si no se envia la fecha de lanzamiento, se setea en la DB como la fecha en que fue enviado el formulario
        const game  = await Videogame.create({name:name,description:description,rating:rating})

          platforms.forEach(async (p) =>{
        const pl = await Platform.findOne({where:{name:p}})
        await Videogame_Platforms.create({VideogameId:game.id,PlatformId:pl.id})
    
    })
           genres.forEach(async (g) =>{
        const gr = await Genre.findOne({where:{name:g}})
        await Videogame_Genres.create({VideogameId:game.id,GenreId:gr.id})
    })

    }else{
         const game  = await Videogame.create({name:name,description:description,rating:rating,released:released})
         
         platforms.forEach(async (p) =>{
            const pl = await Platform.findOne({where:{name:p}})
            await Videogame_Platforms.create({VideogameId:game.id,PlatformId:pl.id})
        
        })
            
        
        genres.forEach(async (g) =>{
            const gr = await Genre.findOne({where:{name:g}})
            await Videogame_Genres.create({VideogameId:game.id,GenreId:gr.id})
        })
    }

  
    res.json(game)
    
}catch(err){
    res.json({error:"Error al crear el videojuego"})
}
   
}


module.exports = {getGames,getGamesById,postGames}