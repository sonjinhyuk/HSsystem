// routes/login.js

module.exports = function(app)
{
    // GET ALL BOOKS
    app.get('/api/login', function(req,res){
        console.log("로그인창")
        res.end();
    });

   
}