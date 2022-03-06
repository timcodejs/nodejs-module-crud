module.exports = (router, db, fs, logger, crypto) => {
    router.route('/member/regist').get((req, res) => {
        fs.readFile(__dirname+'/../views/regist.html', 'utf-8', (err, data) => {
            if(err) {
                logger.info('regist 페이지 접속 실패');
                logger.error(err);
            } else {
                logger.info('regist 페이지 접속 성공');
                res.writeHead(200, {'content-type': 'text/html'});
                res.end(data);
            }
        })
    });

    router.route('/member/regist').post((req, res) => {
        const userinfo = {
            userid: req.body.userid,
            userpw: req.body.userpw,
            name: req.body.name,
            gender: req.body.gender
        }

        if(db) {
            joinMember(userinfo, (err, result) => {
                if(err) {
                    res.writeHead(200, {'content-type':'text/html'});
                    res.write('<h2>회원가입 실패</h2>');
                    res.write('<p>오류가 발생했습니다.</p>');
                    res.end();
                } else {
                    if(result.insertedCount > 0) {
                        logger.info(`${userinfo.userid} 회원 가입 완료`);
                        res.cookie('userid', userinfo.userid, {
                            httpOnly: true,
                            expires: 0,
                            signed: true
                        });
                        res.redirect('/member/login');
                    } else {
                        res.writeHead(200, {'content-type':'text/html'});
                        res.write('<h2>회원가입 실패</h2>');
                        res.write('<p>오류가 발생했습니다.</p>');
                        res.end();
                    }
                }
            });
        } else {
            res.writeHead(200, {'content-type':'text/html'});
            res.write('<h2>데이터베이스 연결 실패</h2>');
            res.write('<p>mongodb 데이터베이스 연결 실패</p>');
            res.end();
        }
    });

    const joinMember = (userinfo, callback) => {
        const members = db.collection('member');
        crypto.createHashedPassword(userinfo.userpw).then((e) => {
            members.insertMany([
                {
                    userid:userinfo.userid, 
                    userpw:e.hashedPassword, 
                    name:userinfo.name, 
                    gender:userinfo.gender,
                    salt:e.salt
                }
            ], (err, result) => {
                if(err) {
                    logger.error(err);
                    return callback(err, null);
                } else {
                    if(result.insertedCount > 0) {
                        logger.info(`사용자 document ${result.insertedCount}명이 추가되었습니다.`);
                        logger.info(JSON.stringify(result));
                    } else {
                        logger.error('사용자 document가 추가되지 않았습니다.');
                    }
                    return callback(null, result);
                }
            });
        })
    }
}   