const mongoose = require('mongoose');
const {Schema} = mongoose

var venta = new Schema   ({
      numero_venta: {type: Number, require: true},
      fecha: {type: Date, require: true},
      metodo_pago: {type: String, require: true},
      descuento: {type: Number, require: true},
      total: {type: Number, require: true},
      id_vendedor: {type: String, require: true},
      sucursal: {type: Number, require: true}
    },
      {collection: 'venta'}
    );
module.exports = mongoose.model('Venta', venta);
