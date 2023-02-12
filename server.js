const express = require('express');
const path = require('path');
const fs = require('fs');
const { json } = require('body-parser');

const port = 3001;

const app = express ();


app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));



app.get('*',(req, res) =>{
    res.sendFile(path.join(__dirname,'/public/index.html'));
});

app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/notes.html'));
});

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname,'/db/db.json'));
});

app.get('/api/notes', (req, res) => {
    
    res.json(`${req.method} request received to get notes`);
  
    console.info(`${req.method} request received to get notes`);
  });

  app.post('/api/notes', (req, res) => {
    
    console.info(`${req.method} request received to add a note`);

    let newNote = req.body;
    let noteList = json.parse(fs.readFileSync('./db/db.json','utf8'));
    let noteLength =(noteList.length).tostring();

    newNote.id=noteLength;
    noteList.push(newNote);
    const noteString= JSON.stringify(noteList);
    fs.writeFileSync('./db/db.json'), 
    
    res.json(noteList);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});