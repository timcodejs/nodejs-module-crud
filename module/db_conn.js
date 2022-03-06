module.exports = (client, router, fs, logger) => {
    let db;
    const crypto = require('./crypto.js');
    const url = 'mongodb://127.0.0.1:27017';
    client.connect(url, {useUnifiedTopology:true}, (err, conn) => {
        if(err) {
            logger.error(`데이터베이스 연결 실패 : ${err}`);
        } else {
            logger.info('데이터베이스 연결 성공');
            db = conn.db('frontend');

            require('./regist.js')(router, db, fs, logger, crypto);
            require('./login.js')(router, db, logger, crypto);
            require('./logout.js')(router, logger);
            require('./main.js')(router, logger);
            require('./edit.js')(router, db, logger, crypto);
            require('./delete.js')(router, db, fs, logger);
        }
    });
}