//import the http module to create a server
const http = require('http');

//import fs module to read files
const fs = require('fs');

//create a server that handles requests and responses
const server = http.createServer(
    (req,res) => {
        //set the response header
        res.setHeader('Content-Type','text/html');


        if(req.url === '/') {
            fs.readFile('./public/index.html', 
                (err, data) => {
                    if(err){
                        res.statusCode = 500; //Internal Server Error
                        res.end('<h1>Internal Server Error</h1>');
                    }else{
                        res.statusCode = 200; //OK
                        res.end(data);
                    }
                }
            );
        }

        // //route handling based on the url
        //  if(req.url === '/'){
        //     res.statusCode = 200; //OK
        //     res.end('<h1>Welcome to my server!</h1>');
        //  }else if(req.url === '/about') {
        //     res.statusCode = 200; //OK
        //     res.end('<h1>About Me</h1><p>This is a simple nodejs server!</p>');
        //  } else if(req.url === '/contact'){
        //     res.statusCode = 200; //OK
        //     res.end('<h1>Contact</h1>');
        //  }
        //  else{
        //     res.statusCode = 404; //Not Found
        //     res.end('<h1>Page Not Found</h1>');
        //  }
    }
);

//define the port to listen
const port = 3000;

server.listen(port, 
    () => {
        console.log(`Server is running on port http://localhost:${port}`);
    }
)