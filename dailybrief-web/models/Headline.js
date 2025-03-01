import mongoose from 'mongoose';

const headlineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Headline = mongoose.models.Headline || mongoose.model('Headline', headlineSchema);

export default Headline;
