require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files (our HTML)
app.use(express.static(path.join(__dirname, 'frontend')));

// API endpoints
app.get('/version', (req, res) => {
  res.json({ version: "v0.1.0" });
});

app.get ('/recipeGenerator', async(req,res) =>{

    const allParams = req.query;

    const externalBaseURL = 'https://api.spoonacular.com/recipes/complexSearch';
    const queryString = new URLSearchParams({
        ...allParams,
        apiKey: process.env.X_API_KEY
    }).toString();
    const externalURL = `${externalBaseURL}?${queryString}`;

    try{
        
        const response = await fetch(externalURL, {
        });
        const data = await response.json();
        res.json(data);
        console.log(externalURL);
    }catch(error){
        res.status(500).json({error: "failed to fetch"})}
    })

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
