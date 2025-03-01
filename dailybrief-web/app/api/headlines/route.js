import { NextResponse } from 'next/server';
import connectDB from '@/utils/db';
import Headline from '@/models/Headline';

// Verbindung zur Datenbank herstellen
connectDB();

// GET-Request: Alle gespeicherten Schlagzeilen abrufen
export async function GET() {
  try {
    const headlines = await Headline.find();
    return NextResponse.json(headlines);
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    return NextResponse.json({ error: 'Fehler beim Abrufen der Daten' }, { status: 500 });
  }
}

// POST-Request: Eine neue Schlagzeile speichern
export async function POST(req) {
  try {
    const { title, link } = await req.json();
    if (!title || !link) {
      return NextResponse.json({ error: 'Fehlende Felder' }, { status: 400 });
    }

    const newHeadline = new Headline({ title, link });
    await newHeadline.save();

    return NextResponse.json({ message: 'Nachricht gespeichert', headline: newHeadline });
  } catch (error) {
    console.error('Fehler beim Speichern:', error);
    return NextResponse.json({ error: 'Fehler beim Speichern der Nachricht' }, { status: 500 });
  }
}