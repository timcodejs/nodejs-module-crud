const express = require('express');
const bp = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const client = require('mongodb').MongoClient;
const cp = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');

const app = express();
const router = express.Router();
const port = require('./config/key.js');
const logger = require('./module/winston');
const combined = ':remote-addr - :remote-user  ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : combined;
console.log(`NODE_ENV : ${morganFormat}`);

app.engine('html', require('ejs').renderFile);
app.use(bp.urlencoded({extended:false}));
app.use(morgan(morganFormat, {stream : logger.stream}));
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.static('public'));
app.use(cp('!@#$%^&*'));
app.use(session({
    secret: '!@#$%^&*',
    resave: false,
    saveUninitialized: true
}));
app.use('/', router);
app.listen(port.PORT, () => {
    logger.info(`${port.PORT}번 포트로 서버 실행 중...`);
    require('./module/db_conn.js')(client, router, fs, logger);
});