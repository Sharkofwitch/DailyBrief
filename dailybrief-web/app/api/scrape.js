import puppeteer from 'puppeteer';
import mongoose from 'mongoose';

// MongoDB URI (Ersetze mit deiner URI von MongoDB Atlas)
const mongoURI = 'mongodb+srv://jakobszarkowicz27:6oDxYgiBay9E8NJ2@cluster0.mongodb.net/dailybrief?retryWrites=true&w=majority';

// MongoDB Schema für die News Headlines
const headlineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// MongoDB Model
const Headline = mongoose.model('Headline', headlineSchema);

// Die Funktion wird von der Serverless-Umgebung aufgerufen
export default async function handler(req, res) {
  try {
    // Verbinde dich mit der MongoDB-Datenbank
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Puppeteer-Browser starten
    const browser = await puppeteer.launch({
      headless: true,  // Keine UI nötig
      args: ['--no-sandbox', '--disable-setuid-sandbox'] // Um sicherzustellen, dass es in der Serverless-Umgebung läuft
    });

    const page = await browser.newPage();
    await page.goto('https://www.bbc.com/news');

    // Die eigentliche Logik zum Scrapen der Headlines
    const headlines = await page.evaluate(() => {
      const elements = document.querySelectorAll('h2[data-testid="card-headline"]');
      const titles = [];

      elements.forEach(element => {
        const title = element.textContent.trim();
        const link = element.closest('a') ? element.closest('a').href : '#';  // Hole den Link aus dem nächstgelegenen <a>-Tag

        titles.push({
          title,
          link
        });
      });

      return titles;
    });

    await browser.close();

    // Speichern der gescrapten Headlines in MongoDB
    const headlineDocuments = headlines.map(headline => new Headline({
      title: headline.title,
      link: headline.link
    }));

    await Headline.insertMany(headlineDocuments);
    console.log('Daten wurden in der MongoDB gespeichert');

    // Erfolgsantwort zurückgeben
    res.status(200).json({ message: 'Scraping erfolgreich durchgeführt und Daten gespeichert', news: headlines });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Scraping oder Speichern', message: error.message });
  }
}
