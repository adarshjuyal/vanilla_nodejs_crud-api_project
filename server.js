const http=require('http');
//require('dotenv').config();
const getReq=require('./methods/get-req');
const postReq=require('./methods/post-req');
const putReq=require('./methods/put-req');
const deleteReq=require('./methods/delete-req');
let movies=require('./data/movies.json');
 const PORT= process.env.PORT || 5001;

 const server=http.createServer((req,res)=>{
    req.movies=movies;
    switch(req.method){
        case 'GET':
        getReq(req,res);
        break;
        case 'POST':
        postReq(req,res);
        break;
        case 'PUT':
            putReq(req,res);
            break;
        case 'DELETE':
            deleteReq(req,res);   
            break; 
        default:
            res.statusCode = 404;
            res.setHeader('Content_type', 'application/json');
            res.write(JSON.stringify({ title: 'NOT FOUND',message :'route not found' }))
            res.end();

    }

  
 });

 server.listen(PORT, ()=>{
    console.log(`server started on port : ${PORT}`);
 })