module.exports = (req, res) => {
    //extract the base url
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    //extract the id
    let id = req.url.split("/")[3];
    //validation checker
    const regexV4 = new RegExp(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );
        //if the url is correct
    if (req.url === "/api/movies") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(req.movies));
        res.end();
    } //if the id is invalid

    else if (!regexV4.test(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                title: "Validation Failed",
                message: "UUID is not valid",
            })
        );
    }//if the id is valid
     else if (baseUrl === "/api/movies/" && regexV4.test(id)) {
        res.setHeader("Content-Type", "application/json");
        //check for the requested movie
        let filteredMovie = req.movies.filter((movie) => {
            return movie.id === id;
        });
        //if the movie exists
        if (filteredMovie.length > 0) {
            res.statusCode = 200;
            res.write(JSON.stringify(filteredMovie));
            res.end();
        } else {
            res.statusCode = 404;
            res.write(
                JSON.stringify({ title: "Not Found", message: "Movie not found" })
            );
            res.end();
        }
    } //invalid request
        else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
    }
};