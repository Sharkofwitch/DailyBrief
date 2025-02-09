import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Pfad zur gespeicherten JSON-Datei
    const filePath = path.join(process.cwd(), 'headlines.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const articles = JSON.parse(data);

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: 'Failed to load articles' }, { status: 500 });
  }
}