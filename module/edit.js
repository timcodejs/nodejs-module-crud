module.exports = (router, db, logger, crypto) => {
    router.route('/member/edit').get((req, res) => {
        const member = req.session.member;
        if(member) {
            findMember(member.userid, (err, result) => {
                if(err) {
                    res.writeHead(200, {'content-type':'text/html; charset=utf-8'});
                    res.write('<h2>페이지 접속 오류</h2>');
                    res.write('<p>오류가 발생했습니다.</p>');
                    res.write('<p><a href="/member/main">돌아가기</a></p>');
                    res.end();
                } else {
                    res.render(__dirname+'/../views/edit.html', {
                        userid: result[0].userid,
                        userpw: result[0].userpw,
                        name: result[0].name,
                        gender: result[0].gender
                    });
                    logger.info('edit 페이지 접속 성공');
                }
            });
        } else {
            res.redirect('/member/login');
        }
        
    });

    router.route('/member/edit').post((req, res) => {
        const userinfo = {
            userid: req.session.member.userid,
            userpw: req.body.userpw,
            name: req.body.name,
            gender: req.body.gender
        }

        if(db) {
            editMember(userinfo, (err, result) => {
                if(err) {
                    res.writeHead(200, {'content-type':'text/html; charset=utf-8'});
                    res.write('<h2>회원 정보 수정 실패</h2>');
                    res.write('<p>오류가 발생했습니다.</p>');
                    res.write('<p><a href="/member/edit">돌아가기</a></p>');
                    res.end();
                } else {
                    if(result.modifiedCount > 0) {
                        logger.info(`${userinfo.userid} 회원 정보 수정 완료`)
                        res.writeHead(200, {'content-type':'text/html; charset=utf-8'});
                        res.write('<h2>회원 정보 수정 성공</h2>');
                        res.write('<p>정보 수정을 성공했습니다.</p>');
                        res.write('<p><a href="/member/main">메인으로 가기</a></p>');
                        res.end();
                    } else {
                        res.writeHead(200, {'content-type':'text/html; charset=utf-8'});
                        res.write('<h2>회원 정보 수정 실패</h2>');
                        res.write('<p>수정사항이 없습니다.</p>');
                        res.write('<p><a href="/member/edit">돌아가기</a></p>');
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

    const editMember = (userinfo, callback) => {
        const members = db.collection('member');
        crypto.createHashedPassword(userinfo.userpw).then((e) => {
            members.updateOne(
                {userid: userinfo.userid}, 
                {$set:{
                    userid: userinfo.userid, 
                    userpw: e.hashedPassword, 
                    name: userinfo.name, 
                    gender: userinfo.gender,
                    salt: e.salt
                }}, (err, result) => {
                    if(err) {
                        logger.error(err);
                        return callback(err, null);
                    } else {
                        if(result.modifiedCount > 0) {
                            logger.info(`사용자 document ${result.modifiedCount}명이 수정되었습니다.`);
                            logger.info(JSON.stringify(result));
                        } else {
                            logger.error('수정된 document가 없습니다.');
                        }
                        return callback(null, result);
                    }
                }
            )
        });
    }
    
    const findMember = (userinfo, callback) => {
        const members = db.collection('member');
        members.find({userid:userinfo}).toArray((err, result) => {
            if(err) {
                console.log(err);
                return callback(err, null);
            } else {
                if(result.length > 0) {
                    console.log('일치하는 사용자가 있습니다.');
                    return callback(null, result);
                } else {
                    console.log('일치하는 사용자가 없습니다.');
                    return callback(null, null);
                }
            }
        })
    }
}