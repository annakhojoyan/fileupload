let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let NoteBookSchema = new Schema(
  {
    marka: { 
      type: String,
      required: true
   },
    price: {
     type: String, 
     required: true 
   },
  
    indikator:{
      type: Number,
      required: true, 
   },

  }
);

NoteBookSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('Notebook', NoteBookSchema);
