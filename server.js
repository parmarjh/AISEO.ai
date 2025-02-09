const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Fetch a random joke from the JokeAPI
const getJoke = async () => {
  try {
    const response = await axios.get('https://v2.jokeapi.dev/joke/Any');
    const joke = response.data;
    return joke;
  } catch (error) {
    console.error('Error fetching joke:', error);
    return { joke: 'Oops! Something went wrong. Please try again later.' };
  }
};

// Route to display the joke
app.get('/', async (req, res) => {
  const joke = await getJoke();
  res.render('index', { joke });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});