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
     
    }else if(req.method ==='POST' && pathname === '/users'){
        let body ='' ;
        
        req.on('data' , chunk => {
            body+= chunk.toString() ;
        });
        
        req.on('end' ,()=>{
            const{ name  , hoppy } = JSON.parse(body) ;
            const newUser = addUser( name  , hoppy) ;
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        }) ;
    }else if(req.method ==='PUT' && pathname.startsWith('/users/')){
        const id  = pathname.split('/')[2] ;
        let body ='' ;
        req.on('data' , chunk =>{
            body+= chunk.toString() ;
        }) ;
        req.on('end' , ()=>{
            const {name  , hoppy } = JSON.parse(body) ;
            const updatedUser = updateUser(id , name , hoppy ) ;
            if(updateUser){
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(updatedUser));
            }else{
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
            }
        });
    }else if(req.method === 'DELETE' && pathname.startsWith('/users/')){
        const id  = pathname.split('/')[2] ;
        deleteUser(id) ;
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({message : 'User deleted'}));
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not found' }));
    }
});

server.get
server.listen(port , hostname , ()=>{
    console.log(`server running at http://${hostname}:${port}/`) ;
}) ;