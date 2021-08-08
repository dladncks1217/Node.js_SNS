const {createLogger, format, transforts, transports} = require('winston');

const logger = createLogger({
    level:'info',
    format:format.json(),
    transports:[
        new transports.File({filename: 'combined.log'}),
        new transports.File({filename: 'error.log',level:'error'}), // 터미널에만 뜨던 로그들이 파일에 들어가는느낌
    ],
});

if(process.env.NODE_ENV !== 'production'){
    logger.add(new transports.Console({format:format.simple()}));
}

module.exports = logger;

// logforjs 등 많은데 얘도 그중 하나.