import * as React from 'react';

const QuoteGenerator = () => {
  const [currentQuote, setCurrentQuote] = React.useState<{
    quote: string;
    author: string;
  } | null>(null);
  const [isFetching, setIsFetching] = React.useState(false);

  const fetchQuote = () => {
    setIsFetching(true);
    fetch('https://api.quotable.io/random')
      .then((res) => res.json())
      .then((res) => {
        setCurrentQuote({
          quote: res.content,
          author: res.author,
        });
      })
      .catch((err) => {
        console.error('Error while fetching quote', err);
      })
      .finally(() => setIsFetching(false));
  };

  const shareQuoteOnTwitter = () => {};

  React.useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <main className="quote-wrapper">
      <p className="quote-text">{currentQuote?.quote}</p>
      <div className="divider" />
      <p className="author-text">{currentQuote?.author}</p>

      <footer className="footer">
        <a
          href={`http://twitter.com/share?text=${currentQuote.quote}`}
          target="_blank"
          className="twitter-link"
        >
          <i className="fa-brands fa-twitter"></i>
        </a>
        <button
          className="primary-btn"
          type="button"
          onClick={fetchQuote}
          disabled={isFetching}
        >
          {isFetching ? 'Fetching...' : 'New Quote'}
        </button>
      </footer>
    </main>
  );
};

export default QuoteGenerator;
