module.exports = function(mongoose) {
	var Schema = mongoose.Schema;
	
	var schema = new Schema({
		username: String,
		score: Number
		
	});

	this.model = mongoose.model('Score', schema);

	return this;
}; 