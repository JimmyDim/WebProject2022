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
 
  
