const mongoose = require('mongoose');

// MongoDB connection URI
const dbURI = 'mongodb://localhost:27017/blog';

// Connect to MongoDB
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
.then(() => {
    console.log('MongoDB connected');
    
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});

module.exports = mongoose;
