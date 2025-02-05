# DailyBrief

DailyBrief ist ein Web-Scraper, der die wichtigsten Nachrichten aus verschiedenen Quellen extrahiert und speichert. Die gesammelten Nachrichten können entweder in einer Web-App angezeigt oder per E-Mail versendet werden.

## Features

- Scraper für Nachrichtenüberschriften.
- Speichert extrahierte Daten in einer JSON-Datei.
- Anpassbar für verschiedene Nachrichtenseiten.

## Installation

1. Klone das Repository:
   ```sh
   git clone https://github.com/Sharkofwitch/DailyBrief.git
   ```
2. Installiere die Abhängigkeiten:
   ```sh
   npm install
   ```
3. Führe den Scraper aus:
   ```sh
   node scraper.js
   ```

## Nutzung

- Um die Nachrichten von anderen Seiten zu scrapen, ändere die URL in `scraper.js` und passe den CSS-Selektor an.
  
## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe die [LICENSE](LICENSE) Datei für Details.
