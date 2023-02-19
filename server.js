const express = require('express');
const path = require('path');
const fs = require('fs');
const { json } = require('body-parser');

const PORT = 3001;

const app = express ();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'./Develop/public')));
const ROOT={root:path.join(__dirname,'./Develop/public')}

app.get('/notes',(req, res)=>{
    res.sendFile('notes.html',ROOT);
});

/* app.get('*',(req, res) =>{
    res.sendFile(path.join(__dirname,'/Develop/public/index.html'));
}); */

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname,'/Develop/db/db.json'));
});

app.get('/api/notes', (req, res) => {
    
    let noteList = JSON.parse(fs.readFileSync(path.join(__dirname,'/Develop/db/db.json'),'utf8'));
    res.json(noteList)
  
    console.info(`${req.method} request received to get notes`);
  });

  app.post('/api/notes', (req, res) => {
    
    console.info(`${req.method} request received to add a note`);

    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync(path.join(__dirname,'/Develop/db/db.json'),'utf8'));
    let noteLength =noteList.length;

    newNote.id = noteLength;
    noteList.push(newNote);
    const noteString = JSON.stringify(noteList);
    fs.writeFileSync(path.join(__dirname,'/Develop/db/db.json'),noteString);
    
    res.json(noteList);
});

app.delete('/api/notes/:id', (req, res) => {
   
    const index=parseInt(req.params.id)
   /*  res.json({test:index}) */
   

    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync(path.join(__dirname,'/Develop/db/db.json'),'utf8'));
    noteList = noteList.filter(function(note, i) { return i !== index });
    console.log(noteList);

    const noteString = JSON.stringify(noteList);
    fs.writeFileSync(path.join(__dirname,'/Develop/db/db.json'),noteString);
    
    res.json(noteList); 
});
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

