module.exports = (router, logger) => {
    router.route('/member/main').get((req, res) => {
        const member = req.session.member;
        if(member) {
            const userid = req.signedCookies.userid;
            if(userid != undefined || userid != null) {
                res.render(__dirname+'/../views/main.html', {
                    userid: userid
                });
                member.loginCount++;
                logger.info('main 페이지 접속 성공');
                logger.info(`${member.userid} 유저가 ${member.loginCount}번 접속했습니다.`);
                logger.info(`${userid} 회원 메인 접속`);
            }
        } else {
            res.redirect('/member/login');
        }
    });
}