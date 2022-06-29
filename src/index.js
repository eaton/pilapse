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
            return '<h1>hello world!</h1>'
        }
    });

    server.route({
        method: 'GET',
        path: '/preview',
        handler: (request, h) => {
            return '<h1>Preview goes here!</h1>'
        }
    });

    server.route({
        method: 'GET',
        path: '/snapshot',
        handler: (request, h) => {
            return '<h1>Trigger a single snapshot, return the image</h1>'
        }
    });

    server.route({
        method: 'GET',
        path: '/timelapse',
        handler: (request, h) => {
            return '<h1>Start a time lapse recording</h1>'
        }
    });

    server.route({
        method: 'GET',
        path: '/slowmotion',
        handler: (request, h) => {
            return '<h1>Start a slow motion recording</h1>'
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
