const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/user', {})
mongoose.connect('mongodb://localhost:27017/user', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("MONGO CONNECTION OPEN!!");
})
.catch(err => {
    console.log("MONGO CONNECTION ERROR!!");
    console.log(err)
})