import mongoose from 'mongoose'; // Use ES module syntax for import

const linkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: false
  },
  img: {
    type: String,
    required: true
  },
  display:{
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create a model from the schema
const Link = mongoose.model('Link', linkSchema);

export default Link; // Use ES module syntax for export
