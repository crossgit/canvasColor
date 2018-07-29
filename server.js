var express = require('express')
// var path = require('path') 

var app = express()
 
// app.use(serveStatic(path.join(__dirname, 'web')))
// app.use(express.static(path.join(__dirname, '/web/assets/')));
app.use(express.static('web'))
app.get('/',function(req,res){
    res.sendFile(__dirname+'/web/index.html');
})
app.listen(3000)

/*
const http = require('http');
const fs = require('fs');
const serveStatic = require('serve-static'); 
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    //   res.statusCode = 200;
    //   res.setHeader('Content-Type', 'text/plain');
    //   res.end('Hello World!\n');
    // fs.readFile('./web/index.html', function (err, data) {
    //     if (err) throw err;
    //     res.writeHead(200, { 'Content_Type': 'text/html' });
    //     res.write(data.toString());
    //     res.end()
    // }) 
    fs.readdir('./web/',function(err,file){
        serveStatic('web',{'index':file})
    })
});

server.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`);
});
*/