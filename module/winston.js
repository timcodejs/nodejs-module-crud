const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');

const logDir = 'logs';  // logs 디렉토리 하위에 로그 파일 저장
const { combine, timestamp, printf } = winston.format;

const logFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});
/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
    ),
    transports: [
        // info 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            // format: winston.format.json(),
            filename: '%DATE%.log', // file 이름 날짜로 저장
            maxFiles: 30, // 30일치 로그 파일 저장
            zippedArchive: true
        }),
        new winstonDaily({
            level: 'warn',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir+'/warn', // warn.log 파일은 /logs/warn 하위에 저장 
            filename: '%DATE%.warn.log', // file 이름 날짜로 저장
            maxFiles: 30, // 30일치 로그 파일 저장
            zippedArchive: true
        }),
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir+'/error', // error.log 파일은 /logs/error 하위에 저장 
            filename: '%DATE%.error.log', // file 이름 날짜로 저장
            maxFiles: 30, // 30일치 로그 파일 저장
            zippedArchive: true
        })
    ]
});

logger.stream = { // morgan wiston 설정
    write: message => {
        logger.info(message);
    }
}

// Production 환경이 아닌 경우(dev 등) 배포 환경에서는 최대한 자원을 안잡아 먹는 로그를 출력해야함
if(process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }))
}

module.exports = logger;