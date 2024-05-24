import express from "express";
const app = express();


app.get('/', (req, res) => {
    res.send('Welcome to The Book Project!');
});

app.get('/books', (req, res) => {
    res.send('This is a placeholder for JSON books');
});


export { app };