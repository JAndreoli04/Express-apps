import express from 'express';
const app = express();

const planets = (await import('npm-solarsystem')).default;


app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
    let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar systemLinks to an external site.";
    let response = await fetch(url);
    let data = await response.json();

    console.log(data);

    let randomNumber = Math.floor(Math.random() * 50);

    let img = data.hits[randomNumber].webformatURL;
    // console.log(img);
    
    res.render('home.ejs', {img})
});

// app.get('/mercury', (req, res) => {
//     let mercuryInfo = planets.getMercury();
//     console.log(mercuryInfo)
//     res.render('mercury.ejs', {mercuryInfo})
// });

app.get('/planetInfo', (req, res) => {
    let planet = req.query.planet;
    let planetInfo = planets[`get${planet}`]();
    res.render('planetInfo.ejs', {planetInfo, planet})
});

app.get('/NASAPOD', async (req, res) => {

    let url = "https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=2026-03-11"
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);
    let img = data.hdurl;
    res.render('NasaPod.ejs', {img});
});


app.listen(3000, () => {
    console.log('server started');
});