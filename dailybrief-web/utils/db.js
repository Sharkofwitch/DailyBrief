import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return; // Falls bereits verbunden, nicht erneut verbinden
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'dailybrief', // Ersetze durch den Namen deiner MongoDB-Datenbank
    });
    console.log('✅ MongoDB erfolgreich verbunden');
  } catch (error) {
    console.error('❌ Fehler bei der MongoDB-Verbindung:', error);
    process.exit(1);
  }
};

export default connectDB;