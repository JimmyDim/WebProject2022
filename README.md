**User Sign Up**

  In order to implement the sign up we create a user model like this bellow :
  
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
      
   1) Before saving a new user in the DB we run a middleware function that implements the hashing of the password.
 
  **User Login**
  
    User provides the username and the password in order to login in his account.
    Its important to know every time if the user is logged in. So we use a session middleware which associates information with a particular cookie that is sent back    to the user, with the user.id. 
