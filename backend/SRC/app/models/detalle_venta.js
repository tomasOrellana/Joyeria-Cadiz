detalle_ventaconst mongoose = require('mongoose');
const {Schema} = mongoose

var detalle_venta = new Schema   ({
        id_venta: {type: String, require: true},
        cod_prod: {type: String, require: true},
        cantidad: {type: Number, require: true}},
        {collection: 'detalle_venta'}
      );

module.exports = mongoose.model('Detalle_venta', inv_prod);