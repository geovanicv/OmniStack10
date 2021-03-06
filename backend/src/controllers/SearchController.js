const Dev = require('../models/Dev')
const parseStringAsArray = require('../util/ParseStringAsArray')


module.exports = {
  async index(req, res) {
    //buscar devs num raio de 10km
    //filtrar por tecnologias
    const {latitude, longitude, techs} = req.query;
    
    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 1000000,
        },
      },
    })

    return res.json({devs})

  }
}