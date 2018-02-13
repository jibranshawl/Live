var express   = require('express');
var app         = express();
var server      = require('http').createServer(app);
var passport    = require('passport');
var util        =  require('util');
var bodyParser  = require('body-parser');
var cookieParser = require('cookie-parser');
var session     = require('express-session');
var GoogleStrategy =require('passport-google-oauth2').Strategy;

app.use(require('morgan')('combined'));

var GOOGLE_CLIENT_ID      = "746657080303-75pitoi500ue0qjsqnonmfmcgcm0grij.apps.googleusercontent.com";
var   GOOGLE_CLIENT_SECRET ="5KKwIndvw8GLPYgs0umfqofk";





passport.use(new GoogleStrategy({
	clientID: GOOGLE_CLIENT_ID,
	clientSecret:GOOGLE_CLIENT_SECRET,
	callbackURL:'http://localhost:3000/auth/google/callback',
	passReqToCallback : true
	},
	function(request,accessToken, refreshToken,profile,cb){

		process.nextTick(function(){


				
		return cb(null,profile);
	  });
}

));
passport.serializeUser(function(user,cb){
	console.log(user);
	cb(null,user);
});	

passport.deserializeUser(function(obj,cb){
	cb(null,obj);
});	




app.set('views',__dirname +'/views');
app.set('view engine','ejs');
app.use(express.static(__dirname +'/app/view'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));
app.use(require('express-session')({secret:'keyboard cat',resave:true,saveUninitialized:true}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/',function(req,res){
	res.render('index',{user: req.user});
});

app.get('/login',function(req,res){
	res.render('login',{user: req.user});
});
app.get('/auth/google',
	passport.authenticate('google',{scope:['profile','email']})
	);
app.get('/auth/google/callback',
	passport.authenticate('google',{
		successRedirect:'/profile',
		failureRedirect:'/login'
	})
	);

server.listen(3000);

function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){return next(); }
	res.redirect('/login');
}



