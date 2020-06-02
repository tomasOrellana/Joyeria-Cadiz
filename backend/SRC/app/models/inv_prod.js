const mongoose = require('mongoose');
const {Schema} = mongoose

var inv_prod = new Schema   ({
        cod_prod: {type: String, require: true}},
        {collection: 'inv_prod'}
      );

module.exports = mongoose.model('Inv_prod', inv_prod);
