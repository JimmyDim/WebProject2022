const bcrypt = require('bcryptjs');
const express = require('express');
const { append } = require('express/lib/response');
const User = require('../models/user');
const router = new express.Router();

//Middleware func checks if the user is logged in. In other case redirect in the login page
const requiredLogin = (req, res, next)=>{
    if(!req.session.user_id){
        return res.redirect('/userLogin');
    } 
    next();
}
router.get('/', (req, res)=>{
    res.redirect('/userLogin');
})

router.get('/homepage',requiredLogin, (req,res)=>{
    res.render('homepage.ejs');
})

//USER SIGN UP
router.get('/userSignUp', (req,res)=>{
    res.render('userSignUp.ejs');
})

router.post('/userSignUp', async (req, res)=>{
    const {password, username} = req.body;
    //passwordValidation() is a static function in user router.
    const isPasswordValid = await User.passwordValidation(req.body.password);
    
    if(isPasswordValid != null){
        console.log("We 've got an error")
        return res.status(400).send(isPasswordValid);
    }

    const user = new User(req.body);
    await user.save();
    //if we do succesfully login, we store the user ID in the session.
    req.session.user_id = user._id;
    res.status(201).redirect('/homepage');
})

//USER LOGIN
router.get('/userLogin', (req,res)=>{
    res.render('userLogin.ejs' , {messages: req.flash('failedLogin')});
})

router.post('/userLogin', async(req,res)=>{
    const {username, password} = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if(foundUser){
        //if we do succesfully login, we store the user ID in the session.
        req.session.user_id = foundUser._id;
        res.redirect('/homepage');
    }else{
        req.flash('failedLogin', "Username or Password is incorrect! Try again")
        res.redirect('/userLogin');
    }
})

//USER LOGOUT
router.get('/userLogout', requiredLogin, (req, res)=>{
    req.session.destroy();
    //when logout we redirect in the login page!
    res.redirect('/userLogin');
})

router.get('/profile', requiredLogin, async(req, res)=>{
    user_id = req.session.user_id;
    const foundUser = await User.findById(user_id);
    const username = foundUser.username;
    const email = foundUser.email;
    const covid_infected = foundUser.positive;
    //Update the Infected by covid to 'negative' value, after 14 days.
    if(covid_infected == "positive" ){
        const current_date = new Date();
        const diffInDays = Math.abs((current_date - foundUser.positive_datetime)/(1000*60*60*24));
        if(diffInDays >= 14){
            const filter = {_id : user_id};
            const update = {positive : "negative", positive_datetime:null}
            await User.findOneAndUpdate(filter, update);
        }
        
    }
    res.render('profile.ejs', {username: username, email : email, positive:covid_infected});
})

router.get('/editProfile', requiredLogin, async(req, res)=>{
    user_id = req.session.user_id;
    const foundUser = await User.findById(user_id);
    const email = foundUser.email;
    res.render('editProfile.ejs', {email : email, messages: req.flash('failedLogin')});
})

router.post('/editProfile', requiredLogin, async(req, res)=>{
    user_id = req.session.user_id;
    const {username, password} = req.body;
    if(password==""){
        const filter = {_id : user_id};
        const update = {username : username}
        await User.findOneAndUpdate(filter, update);

    }else if(username==""){
        const isPasswordValid = await User.passwordValidation(password);
    
        if(isPasswordValid != null){
             req.flash('failedLogin', "Password must contain at least: 1) 8 letters incl 1 capital 2) 1 number 3) 1 symbol. Try again!");
             return res.redirect('/editProfile');
        }

        const filter = {_id : user_id};
        hashed_password = await bcrypt.hash(password, 8);
        const update = {password : hashed_password}
        await User.findOneAndUpdate(filter, update);
    }else{
        const isPasswordValid = await User.passwordValidation(password);
    
        if(isPasswordValid != null){
             req.flash('failedLogin', "Password must contain at least: 1) 8 letters incl 1 capital 2) 1 number 3) 1 symbol. Try again!");
             return res.redirect('/editProfile');
        }

        const filter = {_id : user_id};
        hashed_password = await bcrypt.hash(password, 8);
        const update = {username : username, password: hashed_password}
        await User.findOneAndUpdate(filter, update);
        
    }
    

    res.redirect('/profile');
})

router.get('/editCovidStatus', requiredLogin, (req, res)=>{
    res.render('editCovidStatus.ejs');
})

router.post('/editCovidStatus', requiredLogin,  async(req, res)=>{
    user_id = req.session.user_id;
    const filter = {_id : user_id};
    const {covid_infected, date} = req.body;
    const update = {positive : covid_infected, positive_datetime:new Date(date)}
    await User.findOneAndUpdate(filter, update);
    res.redirect('/profile');
})

module.exports = router;