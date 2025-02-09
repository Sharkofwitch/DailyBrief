import mongoose from 'mongoose';

// MongoDB-URL aus Umgebungsvariablen
const mongoUrl = process.env.MONGODB_URI; // Deine MongoDB-URI

// Mongoose-Schema für die Schlagzeilen
const headlineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
}, { timestamps: true });

const Headline = mongoose.models.Headline || mongoose.model('Headline', headlineSchema);

// Funktion zum Verbinden mit MongoDB
async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return; // Wenn bereits verbunden, nichts tun
  }

  try {
    await mongoose.connect(mongoUrl); // Keine veralteten Optionen mehr
    console.log('Verbindung zur MongoDB-Datenbank hergestellt');
  } catch (error) {
    console.error('MongoDB-Verbindung fehlgeschlagen', error);
    throw new Error('Verbindung zur MongoDB fehlgeschlagen');
  }
}

// API-Handler für das Abrufen der Schlagzeilen
export async function GET() {
  try {
    await connectToDatabase(); // Verbindung zur DB herstellen

    // Abrufen der Schlagzeilen aus der MongoDB-Datenbank
    const headlines = await Headline.find({}).sort({ createdAt: -1 }); // Absteigend nach Erstellungsdatum sortieren

    // Antwort zurückgeben
    return new Response(JSON.stringify(headlines), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Fehler beim Abrufen der Schlagzeilen', error);
    return new Response(
      JSON.stringify({ error: 'Fehler beim Abrufen der Schlagzeilen aus der Datenbank' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Optional: API-Handler für das Hinzufügen neuer Schlagzeilen
export async function POST(request) {
  try {
    await connectToDatabase(); // Verbindung zur DB herstellen

    const { title, link } = await request.json(); // Die Schlagzeilen-Daten aus der Anfrage extrahieren

    // Erstellen einer neuen Schlagzeile
    const newHeadline = new Headline({ title, link });

    // Speichern in der Datenbank
    await newHeadline.save();

    return new Response(
      JSON.stringify({ message: 'Schlagzeile erfolgreich hinzugefügt' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Fehler beim Hinzufügen der Schlagzeile', error);
    return new Response(
      JSON.stringify({ error: 'Fehler beim Hinzufügen der Schlagzeile zur Datenbank' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}