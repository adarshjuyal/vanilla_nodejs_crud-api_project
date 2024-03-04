const crypto=require('crypto');//to generate uuid
const requestBodyParser=require('../util/body-parser.js');
const writeToFile=require('../util/writeToFile.js');
//creating a new movie

module.exports = async (req, res) => {
if(req.url==='/api/movies'){
    try{
        let body= await requestBodyParser(req);
        console.log('Request Body: ',body);

        body.id=crypto.randomUUID();
        req.movies.push(body);
        writeToFile(req.movies);
        res.writeHead(201,{"Content-Type":"application/json"});
        res.end();
    } catch(err){
        console.log(err);
        res.writeHead(400, { "Content-Type": "application/json" });
 
        res.end(JSON.stringify({
            title: "Validation Failed",
            message: "req body  is not valid",
        })
            
        );
    }
}
else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
}
}