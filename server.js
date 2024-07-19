const { createServer } = require('node:http') ;
const url = require('url') ;
const {getUsers , getUser , addUser , updateUser , deleteUser } = require('./app') ;

const hostname = '127.0.0.1' ;
const port  = 3000 ;


const server = createServer((req , res)=> {
    const parsedUrl  = url.parse(req.url , true ) ;
    const{pathname  , query} = parsedUrl ;

    if(req.method === 'GET' && pathname === '/users'){
        const users  = getUsers() ;
        res.writeHead(200 , {'Content-Type' : 'application/json'}) ;
        res.end(JSON.stringify(users)) ;
    }else if(req.method === 'GET' && pathname.startsWith('/users/')){
        const id = pathname.split('/')[2] ;
        const user = getUser(id) ;
        if(user){
            res.writeHead(200 , {'Content-Type' : 'application/json'}) ;
            res.end(JSON.stringify(user)) ;
        }else{
            res.writeHead(404 , {'Content-Type' : 'application/json'}) ;
            res.end(JSON.stringify({message : 'User not found '})) ;
        }
     
    }else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not found' }));
    }

    


});

server.get
server.listen(port , hostname , ()=>{
    console.log(`server running at http://${hostname}:${port}/`) ;
}) ;