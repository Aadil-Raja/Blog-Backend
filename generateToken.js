const jwt = require('jsonwebtoken');

// Define your payload (this is the data you want to include in the token)
const payload = {
    user: {
        id: 'user123',
        name: 'Test User'
    }
};

// Define your secret key (this must match the key used in your middleware)
const secretKey = 'mysecretkey123';  // Ensure this matches what you use in your middleware

// Generate the token
const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

// Output the token
console.log('Generated JWT Token:', token);
