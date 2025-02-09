import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import mongoose from 'mongoose';

const mongoURI = process.env.MONGODB_URI;

// MongoDB Schema
const headlineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// MongoDB Model
const Headline = mongoose.models.Headline || mongoose.model('Headline', headlineSchema);

// API-Route für Scraping
export async function GET() {
  try {
    console.log("Scraper gestartet...");
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://www.bbc.com/news');

    const headlines = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h2[data-testid="card-headline"]')).map(element => ({
        title: element.textContent.trim(),
        link: element.closest('a') ? element.closest('a').href : '#'
      }));
    });

    await browser.close();

    await Headline.deleteMany({});
    await Headline.insertMany(headlines);

    console.log("Scraping erfolgreich!");
    return NextResponse.json({ message: "Scraping erfolgreich", headlines });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Fehler beim Scraping", message: error.message }, { status: 500 });
  }
}