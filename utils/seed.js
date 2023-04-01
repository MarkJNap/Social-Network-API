// const connection = require('../config/connection');
// const { Thought, User } = require('../models');
// const { getUsername, getEmail, getThought } = require('./seedData');

// connection.on('error', (err) => err);

// connection.once('open', async () => {
//     console.log('connected');
//     // Drop documents
//     await User.deleteMany({});
//     await Thought.deleteMany({});
    
//     const users = [];

//     for (let i = 0; i < 5; i++) {
//         const username = getUsername[i];
//         const email = getEmail[i];
//         const thoughts = getThought[i];
    
//         users.push({
//           username,
//           email,
//           thoughts,
//         });
//     }

//     await User.collection.insertMany(users);

//   console.table(users);
//   console.info('Seeding complete! 🌱');
//   process.exit(0);

// })