import { useState, useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import './assets/App.scss'

function App() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState({
    text: "",
    author: ""
  });
  const [randomColor, setRandomColor] = useState("rgb(119, 177, 169)");

  useEffect(() => {
    async function fetchData() {
      await axios
      .get("https://type.fit/api/quotes")
      .then((response) => {
        setQuotes(response.data);
        setQuote(response.data[getRandomNumber(0, quotes.length)]);
      })
      .catch((error) => {
        console.warn(error);
      });
    }

    fetchData();
  }, []);

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    var brightness = (r * 299 + g * 587 + b * 114) / 1000;

    if (brightness < 128) {
      r = Math.floor(Math.random() * 128) + 128;
      g = Math.floor(Math.random() * 128) + 128;
      b = Math.floor(Math.random() * 128) + 128;
    }

    return `rgb(${r},${g},${b})`;
  }

  function getNewQuote() {
    setQuote(quotes[getRandomNumber(0, quotes.length)]);
    const newColor = getRandomColor();
    setRandomColor(newColor);
  }

  return (
    <div
      className="quote fade-transition"
      style={{ backgroundColor: randomColor, color: randomColor }}
    >
      <div id="quote-box" className="quote-card">
        <div className="quote-text">
          <FontAwesomeIcon icon={faQuoteLeft} style={{ color: randomColor }} />
          <span id="text">{quote.text}</span>
        </div>
        <div className="quote-author">
          <span id="author">- {quote.author}</span>
        </div>
        <div className="quote-buttons">
          <div className="share-buttons">
            <a
              id="tweet-quote"
              className="button fade-transition"
              style={{ backgroundColor: randomColor }}
              title="Tweet this quote!"
              href={`https://twitter.com/intent/tweet?hashtags=quotes&text=${quote.text} ${quote.author}`}
              target="_top"
            >
              <FontAwesomeIcon icon={faTwitter} style={{ color: 'white' }} />
            </a>
          </div>
          <button
            id="new-quote"
            className="new-quote fade-transition"
            style={{ backgroundColor: randomColor }}
            onClick={getNewQuote}
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App
