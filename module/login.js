module.exports = (router, db, logger, crypto) => {
    router.route('/member/login').get((req, res) => {
        const member = req.session.member;
        if(member) {
            res.redirect('/member/main');
        } else {
            const userid = req.signedCookies.userid;
            if(userid != undefined || userid != null) {
                res.render(__dirname+'/../views/login.html', {
                    userid: userid
                });
                logger.info('login 페이지 접속 성공. Cookie 있음.');
            } else {
                res.render(__dirname+'/../views/login.html', {
                    userid: ''
                });
                console.log('login 페이지 접속 성공. Cookie 없음.');
            }
        }
    });

    router.route('/member/login').post((req, res) => {
        const userinfo = {
            userid: req.body.userid,
            userpw: req.body.userpw
        }
        if(db) {
            loginMember(userinfo, (err, result) => {
                if(err) {
                    res.writeHead(200, {'content-type':'text/html; charset=utf-8'});
                    res.write('<h2>로그인 실패</h2>');
                    res.write('<p>오류가 발생했습니다.</p>');
                    res.write('<p><a href="/member/login">돌아가기</a></p>');
                    res.end();
                } else {
                    if(result) {
                        logger.info(`${userinfo.userid} 로그인 성공`);
                        res.cookie('userid', userinfo.userid, {
                            httpOnly: true,
                            expires: 0,
                            signed: true
                        });
                        req.session.member = {
                            loginCount: 0,
                            userid: userinfo.userid,
                            userpw: userinfo.userpw
                        }
                        res.redirect('/member/main');
                    } else {
                        res.writeHead(200, {'content-type':'text/html; charset=utf-8'});
                        res.write('<h2>로그인 실패</h2>');
                        res.write('<p>아이디 또는 비밀번호를 확인하세요.</p>');
                        res.write('<p><a href="/member/login">돌아가기</a></p>');
                        res.end();
                    }
                }
            });
        } else {
            res.writeHead(200, {'content-type':'text/html; charset=utf-8'});
            res.write('<h2>데이터베이스 연결 실패</h2>');
            res.write('<p>mongodb 데이터베이스 연결 실패</p>');
            res.end();
        }
    });

    const loginMember = (userinfo, callback) => {
        const members = db.collection('member');
        members.find({userid:userinfo.userid}).toArray((err, result) => {
            if(err) {
                logger.error(err);
                return callback(err, null);
            } else {    
                if(result.length > 0) {
                    console.log(result[0].salt);
                    console.log(result[0].userpw);
                    crypto.verifyPassword(userinfo.userpw, result[0].salt, result[0].userpw).then((e) => {
                        if(e) {
                            logger.info(JSON.stringify(result));
                            logger.info('일치하는 사용자가 있습니다.');
                            return callback(null, result);
                        } else {
                            logger.error('일치하는 사용자가 없습니다.');
                            return callback(null, null);
                        }
                    })
                } else {
                    logger.error('일치하는 사용자가 없습니다.');
                    return callback(null, null);
                }
            }
        })
    }
}