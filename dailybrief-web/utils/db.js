import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'dailybrief',
      serverSelectionTimeoutMS: 5000, // Timeout nach 5 Sekunden
    });
    console.log('✅ MongoDB erfolgreich verbunden');
  } catch (error) {
    console.error('❌ Fehler bei der MongoDB-Verbindung:', error);
  }
};

export default connectDB;
