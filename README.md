# DailyBrief

DailyBrief is a web application that collects and visualizes the most important global news every morning. The app can either display the news directly on a web page or send them via email. It's designed to be a simple yet powerful tool to stay informed about current events.

## Features

- Scrapes the most important news from trusted sources like BBC.
- Displays the news in a clean, responsive layout with a dark background.
- Built with React and Next.js for a smooth and responsive user experience.
- News can be visualized as cards, each containing a title and a link to the full article.

## Installation

To get started with DailyBrief, clone the repository and install the dependencies:

```bash
git clone https://github.com/Sharkofwitch/dailybrief.git
cd dailybrief
npm install
```

## Usage

After installing the dependencies, you can run the app locally using the following command:

```bash
npm run dev
```

This will start the app on `http://localhost:3000`.

### Setting up the Web Scraper

To ensure the scraper collects the latest news, you need to configure it. You can adjust the scraper settings in `scraper.js` to specify which news sources you want to track and how frequently it should run. The scraper currently collects news from [BBC](https://www.bbc.com/news) and outputs the headlines and their corresponding links.

### Email Notification (optional)

If you want to send the news via email, configure your email provider settings in `config/email.js`. You’ll need to provide SMTP credentials to enable email functionality.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! If you want to contribute, feel free to open an issue or submit a pull request.

## Acknowledgments

- [Puppeteer](https://pptr.dev/) for web scraping.
- [React](https://reactjs.org/) and [Next.js](https://nextjs.org/) for frontend development.
- [Styled-components](https://styled-components.com/) for the styling and layout.
