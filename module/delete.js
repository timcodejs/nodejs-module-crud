module.exports = (router, db, fs, logger) => {
    router.route('/member/delete').get((req, res) => {
        const member = req.session.member;
        if(member) {
            fs.readFile(__dirname+'/../views/delete.html', 'utf-8', (err, data) => {
                if(err) {
                    logger.info('delete 페이지 접속 실패');
                    console.error(err);
                } else {
                    logger.info('delete 페이지 접속 성공');
                    res.writeHead(200, {'content-type': 'text/html'});
                    res.end(data);    
                }
            });
        } else {
            res.redirect('/member/login');
        }
    });

    router.route('/member/delete').post((req, res) => {
        const userid = req.session.member.userid;

        if(db) {
            deleteMember(userid, (err, result) => {
                if(err) {
                    res.writeHead(200, {'content-type':'text/html; charset=utf-8'});
                    res.write('<h2>회원 정보 삭제 실패</h2>');
                    res.write('<p>오류가 발생했습니다.</p>');
                    res.write('<p><a href="/member/main">돌아가기</a></p>');
                    res.end();
                } else {
                    if(result.deletedCount > 0) {
                        logger.info('회원 정보 삭제 완료');
                        res.clearCookie('userid');
                        req.session.destroy(() => {
                            logger.info('세션이 삭제되었습니다.');
                        });

                        res.writeHead(200, {'content-type':'text/html; charset=utf-8'});
                        res.write('<h2>회원 정보 삭제 성공</h2>');
                        res.write('<p>회원 탈퇴를 성공했습니다.</p>');
                        res.write('<p><a href="/member/login">돌아가기</a></p>');
                        res.end();
                    } else {
                        res.writeHead(200, {'content-type':'text/html; charset=utf-8'});
                        res.write('<h2>회원 정보 삭제 실패</h2>');
                        res.write('<p>존재하지 않는 아이디입니다.</p>');
                        res.write('<p><a href="/member/main">돌아가기</a></p>');
                        res.end();
                    }
                }
            })
        } else {
            res.writeHead(200, {'content-type':'text/html; charset=utf-8'});
            res.write('<h2>데이터베이스 연결 실패</h2>');
            res.write('<p>mongodb 데이터베이스 연결 실패</p>');
            res.end();
        }
    });

    const deleteMember = (userid, callback) => {
        const members = db.collection('member');
        members.deleteOne({userid: userid}, (err, result) => {
            if(err) {
                logger.error(err);
                return this.callback(err, null);
            } else {
                if(result.deletedCount > 0) {
                    logger.info(`사용자 document ${result.deletedCount}명이 삭제되었습니다.`);
                } else {
                    logger.error('삭제된 document가 없습니다.');
                }
                return callback(null, result);
            }
        });
    }
}