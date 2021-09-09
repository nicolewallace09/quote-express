const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// get random quotes
app.get('/api/quotes/random', (req, res) => {
  const getRandomQuote = getRandomElement(quotes);
  res.send({ quote: getRandomQuote });
}); 

// get all quotes
app.get('/api/quotes', (req, res) => {
  const filterAuthor = quotes.filter(author => {
    return author.person === req.query.person;
  });
  
  if (req.query.person) {
    res.send({ quotes: filterAuthor })
  } else {
    res.send({ quotes: quotes})
  }
}); 

// create a new quote
app.post('/api/quotes', (req, res) => {
  const newPerson = req.query.person;
  const newQuote = req.query.quote; 

  if (newPerson && newQuote) {
    quotes.push({ quote: newQuote, person: newPerson });
    res.send({ quote: { quote: newQuote, person: newPerson } })
  } else {
    res.status(400).send(); 
  }
})

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`)
}); 


// Add a PUT route for updating quotes in the data. This might require adding some sort of unique ID for each quote in the array in data.js.
// Add a DELETE route for deleting quotes from the data array. As with PUT, this might require adding IDs to the data array and using req.params. For both of these ideas, you’ll be able to interact via Postman.
// Add other data to the array, such as the year of each quote, and try to display it on the front-end.
// Add another resource to your API in addition to quotes, such as biographical blurbs (you’ll need to find your own data for this new resource). Use Express Routers to keep your code simple and separated into different files for each router.