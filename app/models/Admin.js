var mongoose = require('mongoose');
var Schema = mongoose.Schema

// Test Schema
var QuestionSchema = new Schema({
    id: Number,
    question: String,
    options: Array,
    answers:  String,
		
	
});

mongoose.model('Question', QuestionSchema);