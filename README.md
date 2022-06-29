# PiLapse
This project uses the relatively lightweight hapi framework to set up a simple
web server on port 80 and expose a couple of REST endpoints for creating,
retrieving, deleting, and triggering "jobs" — named presets for camera operations.

The core use case is using a pi with an attached camera to create a time video by
taking a snapshot every _n_ seconds, then piping the resulting stills through ffmpeg.
Everything else is stubbed around that, and secondary.

## Code used:

* [Hapi](https://hapi.dev), an extremely lightweight Node.js web server framework.
    * [Call](https://hapi.dev/module/call) for somewhat tidier routing
    * [Inert](https://hapi.dev/module/inert) for serving static files
    * [Vision](https://hapi.dev/module/vision) for simple temlating
    * [Log](https://hapi.dev/module/log) for tidier error and event logging
    * [Log](https://hapi.dev/module/log) for tidier error and event logging
    * [Boom](https://hapi.dev/module/boom) and [Bounce](https://hapi.dev/module/bounce) for error handling
* [node-libcamera](https://github.com/superhussain/node-libcamera) to control the camera itself
* [node-rpio](https://github.com/jperkin/node-rpio) for hardware triggers and indicators
* [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) to merge stills into video clips

## Recommended
* [pm2](https://github.com/Unitech/pm2) to daemonize pilapse