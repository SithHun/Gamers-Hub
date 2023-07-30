import axios from 'axios';
import fs from 'fs/promises';
import inquirer from 'inquirer';

inquirer
  .prompt([
    {
      name: 'year',
      message: 'Which year do you want to search games for?',
      type: 'number'
    }
  ])
  .then(async answers => {
    let transformedGames = [];

    for(let page=1; page<=2; page++) {
      try {
        const response = await axios.get(`https://api.rawg.io/api/games?page_size=25&page=${page}&dates=${answers.year}-01-01,${answers.year}-12-31&key=2ce1ade5c6ce4ac487c93348d52fab6f`);
        const games = response.data.results;
        const newGames = games.map(game => ({
          id: game.id,
          name: game.name,
          released: game.released,
          rating: game.rating,
          background_image: game.background_image,
          clip: "No clip available",
          genres: game.genres.map(genre => genre.name),
        }));
        transformedGames.push(...newGames);
      } catch(error) {
        console.log(error);
      }
    }

    // Read existing data from the file
    let existingData = [];
    try {
      const fileData = await fs.readFile('games.json', 'utf8');
      existingData = JSON.parse(fileData);
    } catch(err) {
      console.log('No existing data or error reading file. Starting fresh.');
    }

    // Combine existing data with new data
    const combinedData = [...existingData, ...transformedGames];

    fs.writeFile('games.json', JSON.stringify(combinedData, null, 2))
      .then(() => console.log('Successfully wrote games data to file'))
      .catch((err) => console.log('Error writing file', err));
  });
