const express = require('express');
const app = express();
const path = require('path');

require('./db/mongoose')

app.use(express.json())
app.use(adminRouter)

app.listen(3000, () => {
    console.log("App listening on port 3000")
})

app.get('/testroute', (req, res) => {
    res.send('test ok')
})