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
    console.log('\nWhat would you like to do?');
    console.log('1. Create a customer');
    console.log('2. View all customers');
    console.log('3. Update a customer');
    console.log('4. Delete a customer');
    console.log('5. Quit');    
    const choice = prompt('Enter a number: ');

    switch (choice) {
        case '1':
        //Create a customer
        const name = prompt('Enter customer name: ');
        const age = parseInt(prompt('Enter customer age: '), 10);
        const newCustomer = new Customer({ name, age });
        newCustomer.save()
        .then(() => console.log('Customer created successfully!'))
        .catch((error) => console.error('Error creating customer:', error));
        break;

        case '2':
      // View all customers
      Customer.find()
        .then((customers) => {
          console.log('\nCustomers:');
          customers.forEach(customer => { // Inside the .then block
            console.log(`Name: ${customer.name}, Age: ${customer.age}`);
          });
        })
        .catch((error) => console.error('Error finding customers:', error));
      break;

      case '3':
        //Update a customer
        const customerIdToUpdate = prompt('Enter the ID of the customer you want to update: ');
        const updatedName = prompt('Enter the new name: ');
        const updatedAge = parseInt(prompt('Enter the new age: '), 10);

        Customer.findByIdAndUpdate(customerIdToUpdate, { name: updatedName, age: updatedAge }, {new: true})
        .then((updatedCustomer) => {
            if(updatedCustomer) {
                console.log(`Customer updated: Name: ${updatedCustomer.name}, Age: ${updatedCustomer.age}`)
            } else {
                console.log('Customer not found');
            }
        })
        .catch((error) => console.error('Error updating customer:', error));
        break;

        case '4':
            //Delete a customer
            const customerIdToDelete = prompt('Enter the ID of the customer you want to delete: ');

            Customer.findByIdAndDelete(customerIdToDelete)
            .then((deletedCustomer) => {
                if(deletedCustomer) {
                    console.log('Customer deleted successfully.');
                    } else {
                        console.log('Customer not found');
                }
            })

            .catch((error) => console.error('Error deleting customer:', error));
        break;

        case '5':
            // Exit the program
            running = false;
            console.log('Exiting...');
            mongoose.connection.close(); // Close the database connection before exiting
            break;

            default:
            console.log('Invalid choice. Please try again.');
        }
        }

