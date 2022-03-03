
const {Platform} = require('../db')


async function getPlatform(req,res){

    try{
      const results = await Platform.findAll()
        res.json({results})
    }catch(err){
        res.send(err)
    }
}


module.exports = {getPlatform}