const mongoose = require('mongoose');

// Define the Customer schema
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

// Create a model from the schema and export it
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
