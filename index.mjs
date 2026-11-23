import express from 'express';
import fetch from 'node-fetch';

const planets = (await import('npm-solarsystem')).default;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

// routes
app.get('/', async (req, res) => {
    let apiKey = "cNGyhCxe9EK-EQ1E3roKReU52hiRXTmx29nP8bMFKfg";
    let url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&featured=true&query=solar-system`;
    let response = await fetch(url);
    let data = await response.json();
    let randomImage = data.urls.full;
    res.render("index", { "image": randomImage })
});

app.get('/nasa', async (req, res) => {
    let apiKey = "9D7Mhfj8798gHPjKtWqq7zRbw8gnmJj7zGMPDMMn";
    let url = `https://science.nasa.gov/wp-json/wp/v2/apod-basic/?api_key=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();
    let result = data[0];
    res.render("nasa", { result })
});

app.get('/planet', (req, res) => {
    let planetName = req.query.planetName;
    let planetInfo = planets[`get${planetName}`]();
    res.render('planet', { planetInfo, planetName });
});


app.listen(3000, () => {
    console.log('server started');
});