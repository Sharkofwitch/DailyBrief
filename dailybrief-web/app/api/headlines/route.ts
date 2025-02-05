import fs from 'fs';
import path from 'path';

export async function GET() {
  // Lese die gescrapten Daten aus der JSON-Datei
  const filePath = path.join(process.cwd(), 'app/scripts/headlines.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  const headlines = JSON.parse(data);

  return new Response(JSON.stringify(headlines), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
