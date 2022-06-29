'use strict';
const Hapi = require('@hapi/hapi');
const Path = require('path');
const libcamera = require('node-libcamera')

const init = async () => {
    const server = Hapi.server({
        port: 80,
        host: '0.0.0.0'
    })

    await server.register(require('@hapi/inert'));

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            libcamera.still({ output: '~/test.jpg' })
                .then((result) => {
                    return h.file('~/test.jpg');
                })
                .catch((error) => {
                    return JSON.stringify(error)
                })
        }
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
