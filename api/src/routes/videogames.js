const axios  = require('axios');
require('dotenv').config();
const {Videogame,Videogame_Platforms,Videogame_Genres,Platform,Genre} = require('../db');
const {API_KEY} = process.env;





async function getGames(req,res){
    let page=1;
    let allGames= [];
    let GamesByName=[];
    const {name} = req.query;

    try{    
        if(name){
        const responseApiName = await axios.get(`https://rawg.io/api/games?key=${API_KEY}&search=${name}`)
        if(responseApiName.data.count !== 0 ){ 
            if(responseApiName.data.count < 15 ){
                responseApiName.data.results.forEach((g)=> GamesByName.push({
                    id:g.id,
                    name:g.name,
                    released:g.released,
                    background_image: g.background_image,
                    rating:g.rating,
                    platforms: g.platforms.map((p)=> p.platform.name),
                    genres: g.genres.map((g)=> g.name)
                }))
                res.json(GamesByName)
            }else{
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
             res.json(GamesByName)
            }
        }else{
            res.status(404).send({error:'Videogames not found'})
        }
        }
        
    

        while(allGames.length!==100){
           const responseApi = await axios.get(`https://rawg.io/api/games?key=${API_KEY}&page=${page}`)
            responseApi.data.results.forEach((g)=> allGames.push({
           id:g.id,
           name:g.name,
           background_image: g.background_image,
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
            released:responseApiId.data.released,
            background_image: responseApiId.data.background_image_additional,
            rating:responseApiId.data.rating,
            platforms: responseApiId.data.platforms.map((p)=> p.platform.name),
            genres: responseApiId.data.genres.map((g)=> g.name)
        })
    }
        }

    

    }catch(err){
        res.status(404).send({error:'Videogame not found'})
    }
        
        
       
     

}


async function postGames(req,res){
    const {name,description, rating, released,genres,platforms} = req.body


try{
    if(name==="" || description===""){
        res.status(400).send({error:"Datos enviados incorrectamente"})
    }else if(released === ""){
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

  
    res.status(200).send(game)
    
}catch(err){
    res.send(err)
}


    
}


module.exports = {getGames,getGamesById,postGames}