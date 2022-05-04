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

//UPDATE USER
router.get('/profile', requiredLogin, async(req, res)=>{
    user_id = req.session.user_id;
    const foundUser = await User.findById(user_id);
    const username = foundUser.username;
    const email = foundUser.email;
    res.render('profile.ejs', {username: username, email : email});
})

router.get('/editProfile', requiredLogin, async(req, res)=>{
    user_id = req.session.user_id;
    const foundUser = await User.findById(user_id);
    const email = foundUser.email;
    res.render('editProfile.ejs', {email : email});
})

router.post('/editProfile', requiredLogin, async(req, res)=>{
    user_id = req.session.user_id;
    const {username, password} = req.body;
    const isPasswordValid = await User.passwordValidation(password);
    
    if(isPasswordValid != null){
        console.log("We 've got an error")
        return res.status(400).send(isPasswordValid);
    }

    const filter = {_id : user_id};
    hashed_password = await bcrypt.hash(password, 8);
    const update = {username : username, password: hashed_password}
    await User.findOneAndUpdate(filter, update);
    res.redirect('/profile');
})


//FUTURE ROUTERS
router.get('/adminLogin', (req,res)=>{
    res.render('adminLogin.ejs');
})

router.get('/dataAdministration', (req,res)=>{
    res.render('dataAdministration.ejs')
})

router.get('/statistics',requiredLogin, (req, res)=>{
    res.render('statistics.ejs')
})



module.exports = router;