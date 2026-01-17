const http = require('http')
const fs = require('fs')
const path = require('path')

const port = 3000  // or 8080 or 6000 or 8000

const server = http.createServer((request, response)=>{
  //REQUEST 
    
    // path of the file
    const filePath = path.join(__dirname, request.url === '/' ? "index.html" : request.url)
    console.log(filePath);
    
    // extension of the file
    const extName = String(path.extname(filePath).toLowerCase())  // .com ? .js? .png?

    const mimeTypes = {          // types of files supported
        '.html': 'text/html',
        '.css': 'text/css',   
        '.js': 'text/javaScript',
        '.png': 'text/png'
    }
    const contentType = mimeTypes[extName] || 'application/octet-stream';
    
  // RESPONSE

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if(err.code === "ENOENT"){    //ENOENT = ERROR NO ENTRY
                response.writeHead(404, {'Content-Type': "text/html"});
                response.end("404: File not found Bruh!");
            }
            
        }else{
            response.writeHead(200, {'Content-Type': contentType})
            response.end(content, 'utf-8') // english )
        }

    })




});
    
server.listen(port, ()=> {
    console.log(`Server is listening on port ${port} girls! Go rant!`);
    
})