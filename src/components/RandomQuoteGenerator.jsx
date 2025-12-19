import { useCallback, useState } from "react";

const RandomQuoteGenerator = () => {
  const Quote = [
    {
      text: "It is never too late to be what you might have been.",
      author: "George Eliot",
      genre: "Inspiration",
    },
    {
      text: "Be yourself; everyone else is already taken.",
      author: "Oscar Wilde",
      genre: "Life",
    },
    {
      text: "Imagination is more important than knowledge.",
      author: "Albert Einstein",
      genre: "Knowledge",
    },
    {
      text: "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.",
      author: "Martin Luther King Jr.",
      genre: "Inspiration",
    },
    {
      text: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
      author: "Maya Angelou",
      genre: "Life",
    },
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      genre: "Success",
    },
    {
      text: "It does not matter how slowly you go as long as you do not stop.",
      author: "Confucius",
      genre: "Wisdom",
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
      genre: "Dreams",
    },
    {
      text: "It always seems impossible until it's done.",
      author: "Nelson Mandela",
      genre: "Motivation",
    },
    {
      text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
      author: "Aristotle",
      genre: "Philosophy",
    },
    {
      text: "The secret of getting ahead is getting started.",
      author: "Mark Twain",
      genre: "Productivity",
    },
    {
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
      genre: "Confidence",
    },
    {
      text: "I must not fear. Fear is the mind-killer.",
      author: "Frank Herbert",
      genre: "Courage",
    },
    {
      text: "You are never too old to set another goal or to dream a new dream.",
      author: "C.S. Lewis",
      genre: "Hope",
    },
    {
      text: "Hope is the thing with feathers that perches in the soul.",
      author: "Emily Dickinson",
      genre: "Poetry",
    },
    {
      text: "The journey of a thousand miles begins with one step.",
      author: "Lao Tzu",
      genre: "Patience",
    },
    {
      text: "Life is either a daring adventure or nothing at all.",
      author: "Helen Keller",
      genre: "Adventure",
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
      genre: "Resilience",
    },
    {
      text: "Not all those who wander are lost.",
      author: "J.R.R. Tolkien",
      genre: "Adventure",
    },
    {
      text: "Luck is what happens when preparation meets opportunity.",
      author: "Seneca",
      genre: "Philosophy",
    },
    {
      text: "You miss 100% of the shots you don't take.",
      author: "Wayne Gretzky",
      genre: "Sports",
    },
  ];
  const [activequote, setActivequote] = useState(Quote[0]);

  const quoteGenerator = useCallback(() => {
    let randomIndex = Math.floor(Math.random() * Quote.length);

    setActivequote(Quote[randomIndex]);
  }, [Quote]);
  console.log(activequote);

  const copyQuote = useCallback(() => {
    window.navigator.clipboard.writeText(activequote.text);
  }, [setActivequote, activequote]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        {/* App header */}
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-100 tracking-tight">
            Random Quote Generator
          </h1>
          {/* <span className="text-xs text-slate-400">UI only</span> */}
        </header>

        {/* Card */}
        <div className="relative rounded-2xl border border-slate-700/60 bg-slate-800/60 backdrop-blur shadow-xl">
          {/* Decorative corner accents */}
          <div className="absolute -top-0.5 -left-0.5 h-3 w-3 rounded-tl-xl border-t border-l border-slate-600/60" />
          <div className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-tr-xl border-t border-r border-slate-600/60" />
          <div className="absolute -bottom-0.5 -left-0.5 h-3 w-3 rounded-bl-xl border-b border-l border-slate-600/60" />
          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-br-xl border-b border-r border-slate-600/60" />

          {/* Quote content */}
          <div className="px-6 py-5 sm:px-8 sm:py-7">
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="text-3xl sm:text-4xl text-indigo-400 select-none"
              >
                “
              </span>
              <p className="text-slate-100 text-lg sm:text-xl leading-relaxed">
                {activequote?.text}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-px w-6 bg-slate-600" />
                <span className="text-sm text-slate-300">
                  {activequote?.author}
                </span>
              </div>

              {/* Category/tag pill */}
              <span className="rounded-full bg-indigo-500/15 text-indigo-300 text-xs px-3 py-1 border border-indigo-500/25">
                {activequote?.genre}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="border-t border-slate-700/60 px-6 py-4 sm:px-8 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={quoteGenerator}
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 6v6l4 2"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                New quote
              </button>

              <button
                onClick={copyQuote}
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100 text-sm font-medium px-4 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M8 16h8M8 12h8M8 8h8"
                  />
                </svg>
                Copy
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100 text-sm font-medium px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                aria-label="Previous quote"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M15.5 19a1 1 0 0 1-.7-.29l-7-7a1 1 0 0 1 0-1.42l7-7A1 1 0 0 1 16.5 4v14a1 1 0 0 1-1 1z" />
                </svg>
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100 text-sm font-medium px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                aria-label="Next quote"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8.5 19a1 1 0 0 0 .7-.29l7-7a1 1 0 0 0 0-1.42l-7-7A1 1 0 0 0 7.5 4v14a1 1 0 0 0 1 1z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Footer help text */}
        <p className="mt-4 text-center text-xs text-slate-400">
          {/* Add your logic to replace the quote, author, and tag on button click. */}
        </p>
      </div>
    </div>
  );
};

export default RandomQuoteGenerator;
