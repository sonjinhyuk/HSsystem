// routes/login.js

module.exports = function(app, User)
{
    // 로그인창
    app.get('/user/login', function(req,res){
        res.sendFile('/npm/web/html/user/login.html');
        console.log("로그인창");
    });
    
    //로그인
    app.post('/user/doLogin', function(req,res){
        console.log('/user/doLogin 호출됨');
        var userid = req.body.userid || req.query.userid;
        var userpw = req.body.userpw || req.query.userpw;
        console.log('input id :' + userid.toString() + '  :  pw : ' + userpw);
        var users = database.collection("users");
        var result = users.find({ "id": userid, "passwords": userpw });
 
        result.toArray(
            function (err, docs) {
                if (err) {
                    callback(err, null);
                    return;
                }
    
                if (docs.length > 0) {
                    console.log('find user [ ' + docs + ' ]');
                }
                else {
                    console.log('can not find user [ ' + docs + ' ]');
                    alert("can not find user [ '" + docs + "' ]")
                }
            }
        );
        
    });

    //회원가입창
    app.get('/user/adduser', function(req,res){
        res.sendFile('/npm/web/html/user/adduser.html');
        console.log("회원가입창");
    });

    //회원가입
    app.post('/user/doAddUser', function(req,res){
        console.log('/user/doAddUser 호출됨');

        var paramID = req.body.id || req.query.id;
        var paramPW = req.body.passwords || req.query.passwords;
        console.log('paramID : ' + paramID + ', paramPW : ' + paramPW);
        var user = new User();
        user.id = paramID;
        user.pw = paramPW;

        user.save(function(err, user){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }
            res.json({result: 1});
        });

        // user.insertMany([{ "id": paramID, "passwords": paramPW, "name": "test" }],
        //     function (err, result) {
        //         if (err) {
        //             callback(err, null);
        //             return;
        //         }
        //         //데이터가 추가됐다면 insertedCount 카운트가 0 보다 큰값이 된다
        //         if (result.insertedCount > 0) {
        //             console.log('사용자 추가 됨' + result.insertedCount);
        //             callback(null, result);
        //         }
        //         else {
        //             console.log('사용자 추가 안됨' + result.insertedCount);
        //             callback(null, null);
        //         }
        //     }
        // );
    });    
}