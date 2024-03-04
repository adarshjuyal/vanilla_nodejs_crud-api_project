const writeToFile=require('../util/writeToFile')
module.exports = (req, res) => {
let baseUrl =req.url.substring(0,req.url.lastIndexOf('/')+1);
let id=req.url.split('/')[3];
const regxV4=new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
);
if(!regxV4.test(id)){
    res.writeHead(400,{'Content-Type':'application/json'});
    res.end(
        JSON.stringify({
            title:'Validation Failed',
            message:'uuid is not valid',
        })
    );
}
else if(baseUrl==='/api/movies/' && regxV4.test(id)){
    const index=req.movies.findIndex((movie)=>{
        return movie.id===id;
    });
    if(index===-1){
        res.writeHead(404,JSON.stringify({title:'NOT FOUND',message:'Movie not found'}));
        res.end();
    }
    else{
        req.movies.splice(index,1);
        writeToFile(req.movies);
        res.writeHead(204,{'Content-Type':'application/json'});
        res.end(JSON.stringify(req.movies));
    }
}
else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
}

}