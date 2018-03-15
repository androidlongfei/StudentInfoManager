// bucker插件,log输出

import bucker from 'bucker'

const options = {
    access: 'logs/access.log',
    debug: 'logs/debug.log',
    error: 'logs/error.log',
    app: {
        file: 'logs/app.log'
    },
    console: true
};

module.exports = bucker.createLogger(options, module)
