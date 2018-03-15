// swagger插件,文档输出

import inert from 'inert'
import vision from 'vision'
import hapiSwagger from 'hapi-swagger'

module.exports = [
    inert,
    vision, {
        register: hapiSwagger,
        options: {
            info: {
                title: 'student achievement manager system API Documentation',
                version: '1.0'
            },
            securityDefinitions: {
                jwt: {
                    type: 'apiKey',
                    name: 'token',
                    in: 'header'
                }
            }
        }
    }
];
