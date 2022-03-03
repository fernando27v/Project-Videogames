const {Genre} = require('../db')


async function getGenre(req,res){

    try{
      const results = await Genre.findAll()
        res.json({results})
    }catch(err){
        res.send(err)
    }
}


module.exports = {getGenre}