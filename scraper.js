const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.bbc.com/news');

    const headlines = await page.evaluate(() => {
        const elements = document.querySelectorAll('h2[data-testid="card-headline"]');
        const titles = [];
        elements.forEach(element => {
            titles.push(element.textContent);
        });
        return titles;
    });
    fs.writeFileSync('headlines.json', JSON.stringify(headlines, null, 2));
    console.log("Data was scraped and saved to headlines.json");

    await browser.close();
})();