const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  // Este campo es autogenerado por MongoDB
  // id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  
  code: {
    type: String,
    required: true,
    unique: true,
    default: () => `CODE-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
});

// Crear el modelo Ticket
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;

