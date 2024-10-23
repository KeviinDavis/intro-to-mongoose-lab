const prompt = require('prompt-sync')();

// const username = prompt('What is your name? ');

// console.log(`Your name is ${username}`);


const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Customer = require('./customer');

// Load the environment variables from .env file
dotenv.config();

// Connect to MongoDB using the connection string from the .env file
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


//Menu loop
let running = true;

while (running) {
    console.log('/nWhat would you like to do?');
    console.log('1. Create a customer?');
    console.log('2. View all customer?');
    console.log('Quit');
    const choice = prompt('Enter a number: ');

    switch (choice) {
        case '1':
        //Create a customer
        const name = promt('Enter customer name: ');
        const age = parseInt(prompt('Enter customer age: '), 10);
        const newCustomer = new Customer({ name, age });
        newCustomer.save()
        .then(() => console.log('Customer created successfully!'))
        .catch((error) => console.error('Error creating customer:', error));
        break;

        case '2':
        //View all customers 
        Customer.find()
        .then((customers) => console.log(customers))
        customers.forEach(customers => {
            console.log(`Name: ${customers.name}, Age: ${customers.age}`);
        })
    }};

        .catch((error) => console.error('Error finding customers:', error));
        break;

        case '3':
            