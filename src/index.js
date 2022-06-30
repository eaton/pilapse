'use strict';
const Hapi = require('@hapi/hapi');
const Path = require('path');
const Inert = require('@hapi/inert');

const fs = require('fs-extra')
const libcamera = require('node-libcamera')

const init = async () => {
    const server = Hapi.server({
        port: 80,
        host: '0.0.0.0',
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'files')
            }
        }
    })

    await server.register(require('@hapi/inert'));


    server.route({
        method: 'GET',
        path: '/files/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true,
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            let path = Path.join(__dirname, 'preview.jpg')
            if (!fs.pathExistsSync(path)) {
                libcamera.jpeg({ }).then(() => {
                    return h.file('preview.jpg');
                })
            } else {
                return h.file('preview.jpg');
            }
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
