const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    email:{
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid. Try another one!')
            }
        }
    },
    password : {
        type : String,
        required : true,
        trim : true
    }
})

//Check if the requirements of the password are satisfied.
userSchema.statics.passwordValidation = async (password)=>{

    var symbolFormat = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    var numberFormat = /[1234567890]/
    var capitalFormat = /[A-Z]/
    if (!symbolFormat.test(password)){
        return "Your password must contain at least one symbol."
    }

    if(!numberFormat.test(password)){
        return "Your password must contain at least one number."
    }

    if(!capitalFormat.test(password)){
        return "Your password must contain at least one capital letter."
    }

    if(password.length < 8){
        return "Your password must contain at least 8 characters."
    }

    return 

}

//Find the user by username we provided as an arg, and compare the password with the hash password.
//Returns the object of the foundUser or False.
userSchema.statics.findAndValidate = async (username, password)=>{
    const foundUser = await User.findOne({username});
    if(foundUser !== null){
        const isValid = await bcrypt.compareSync(password, foundUser.password);
        return isValid ? foundUser : false;
    }else{
        return false;
    }
    
}

userSchema.pre('save', async function(next){
    const user = this;
    
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    console.log("Entered into the middleware function!");
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User;