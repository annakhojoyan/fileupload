let mongoose = require('mongoose');
let noteBook = require('../models/notebook');
let HttpStatus = require('http-status');

function getnoteBooks(req, res) {
    let query = noteBook.find({});
    query.exec((err, notebooks) => {
        if(err) res.send(err);
        res.json(notebooks);
    });
}

function postnoteBook(req, res) {
    var newnoteBook = new noteBook(req.body);
    console.log(req.body);
    newnoteBook.save((err,notebook) => {
        if(err) {
            res.send(err);
        }
        else { 
            res.json({message: "noteBook successfully added!", notebook });
        }
    });
}

// function getBook(req, res) {
//     Book.findById(req.params.id, (err, book) => {
//         if(err) res.send(err);
//         res.json(book);
//     });     
// }
  
function getnoteBook(req, res) {
    noteBook.findById(req.params.id, (err, notebook) => {
        if(err) res.send(err);
        console.log(notebook.indikator);
        if(notebook.indikator === 0){
        notebook.indikator = 1;
       notebook.save((err,notebook) => {
        if(err) {
            res.send(err);
        }
        else { 
            res.json({message: "noteBook updated!", notebook });
        }
    });
    }else if(notebook.indikator === 1){
        res.send('In use');
    }
    }); 
}

function deletenoteBook(req, res) {
    noteBook.remove({_id : req.params.id}, (err, result) => {
        res.json({ message: "noteBook successfully deleted!", result });
    });
}

function updatenoteBook(req, res) {
    noteBook.findById({_id: req.params.id}, (err, notebook) => {
        if(err) res.send(err);
        Object.assign(notebook, req.body).save((err, notebook) => {
            if(err) res.send(err);
            res.json({ message: 'noteBook updated!', notebook });
        }); 
    });
}

module.exports = { getnoteBooks, postnoteBook, getnoteBook, deletenoteBook, updatenoteBook };
