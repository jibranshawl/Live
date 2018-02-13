var mongoose = require('mongoose');
var express = require('express');
module.exports.controllerFunction = function(app) {

// list all products
	userRouter.get('/',function(req, res) {

			productModel.find(function(err,result){
				if(err){
					res.send(err)
				}
				else{
					res.send(result)
				}


			});// end user model find 
		  
		});

// end route to GET all products

// route to get a particular product
	userRouter.get('/products/:id',function(req, res) {

			productModel.findOne({'_id':req.params.id},function(err,result){
				if(err){
					console.log("some error");
					res.send(err);
				}
				else{
					//console.log(result);
					res.send(result)
				}


			});// end user model find 
		  
		});

// end route to get a particular product


// start route to Create a product

  userRouter.post('/create',function(req, res) {

	 if(req.body.id!=undefined && req.body.question!=undefined && req.body.answer!=undefined &&req.body.option!=undefined ){		var newtest = new testModel({

			id 					: req.body.id,
			question 			: req.body.question,
			option				: req.body.option,
			answer    	 		: req.body.answer

		}); // end newproduct 


	// now lets save the file 
		newtest.save(function(err){
			if(err){
				 var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                   res.send(myResponse);
                   
			}
			else{
				 var myResponse = responseGenerator.generate(false,"successfully created",200,newtest);
                  res.send(myResponse);
               	}

		}); // end new product save

	  
		}
		 else{

            var myResponse = {
                error: true,
                message: "Some body parameter is missing",
                status: 403,
                data: null
            };

            res.send(myResponse);

            
		 }

});// end route to Create a products


// start route to edit a product using _id 

userRouter.put('/products/:id/edit',function(req, res) {

	var update = req.body;

	productModel.findOneAndUpdate({'_id':req.params.id},update,function(err,result){

		if(err){
			console.log("some error");
			res.send(err)
		}
		else{
			res.send(result)
		}


	}); 
  
});
// end route to edit a product using _id


// start the route to delete a product 
userRouter.post('/products/:id/delete',function(req, res) {

	productModel.remove({'_id':req.params.id},function(err,result){

		if(err){
			console.log("some error");
			res.send(err)
		}
		else{
			res.send(result)
		}


	}); 
  
});


    app.use('/amazon', userRouter);

}