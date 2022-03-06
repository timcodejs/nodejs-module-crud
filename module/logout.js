module.exports = (router, logger) => {
    router.route('/member/logout').get((req, res) => {
        logger.info('로그아웃 완료');
        req.session.destroy(() => {
            logger.info('세션이 삭제되었습니다.');
        });
        res.redirect('/member/login');
    });
}