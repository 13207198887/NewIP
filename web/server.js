const express = require("express");
const path = require('path')
var proxy = require('http-proxy-middleware');
const app = express()
var c = require('child_process');


app.use('/index',express.static(path.join(__dirname,'./')));

app.use(proxy("/",{ target: 'https://translate.google.cn',changeOrigin:true}));

app.listen(7890,()=>{
    console.log('App listening at port http://localhost:7890')
});

c.exec('start http://localhost:7890/index');