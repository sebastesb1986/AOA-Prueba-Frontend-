const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname+'/dist/frontend-aoa'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/frontend-aoa/index.html'));
});

// port
app.listen(process.env.PORT || 8080);