const mongoose = require('mongoose');
const { Schema } = mongoose;

const pedido = new Schema({
  fecha: {type: String, required: true},
  id_cliente : {type: String, required: true},
  id_sucursal : {type: String, required: true},
  descripcion: {type: String, required: true},
  estado : {type: String, required: true},
  total: {type: Number, required: true},
  },
  {collection: 'pedido'}
)

module.exports = mongoose.model('Pedido', pedido);
