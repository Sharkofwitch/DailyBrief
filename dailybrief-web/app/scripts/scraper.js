import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.bbc.com/news');

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

  // Speichere die gescrapten Daten
  fs.writeFileSync('headlines.json', JSON.stringify(headlines, null, 2));
  console.log("Data was scraped and saved to headlines.json");

  await browser.close();
})();
