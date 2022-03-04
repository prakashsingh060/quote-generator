const quoteConatiner = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

let apiQuotes = [];
// show new quote

function newQuote() {
  // pick a random quote from apiquote array

  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // if author field is blank
  quoteText.textContent = quote.text;
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.text.length > 15) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
// get quotes from api

async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const res = await fetch(apiUrl);
    apiQuotes = await res.json();
    newQuote();
  } catch (error) {
    alert(error);
    // catch error here
  }
}

// tweet quote

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//on load
getQuotes();
