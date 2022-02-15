# Image Uploader Challenge
### Solution for a challenge for [Devchallenges.io](https://devchallenges.io/).

## Links:
- ## [Demo](https://image-upload-websit.onrender.com)
- ## [Front-end code](https://github.com/moharambe1/image-uploader)
- ## [Challenge](https://github.com/moharambe1/image-uploader)


Image Uploader application is a cloud-enabled, mobile-ready.

## Features
- responsive UI. 
- Drag and Drop functionality.
- Select image otherwise.
- Valid extension check
- Supported format : png , jpg , jpef , gif

## Overview

![alt text](https://github.com/moharambe1/image-uploader/blob/master/screenshot/1.png "uploading page")
![alt text](https://github.com/moharambe1/image-uploader/blob/master/screenshot/2.png "loading page")
![alt text](https://github.com/moharambe1/image-uploader/blob/master/screenshot/3.png "succes uploading page")

## Tech
Image Uploader uses a number of open source projects to work properly:
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework

## Installation

Imgae uploader requires [Node.js](https://nodejs.org/) v10+ to run and [Postgres database](https://www.postgresql.org/).

Install the dependencies and define environnement virtuel devDependencies and start the server.

For environments variable…
```sh
DOMAIN_URL=["Your domin name"]
REACT_APP_PRODUCTION="true"
PORT=["choose PORT"]
AND DATABASE crodintiol:
use one of those:
PG_CONNECT_STRING=["CONNECT STRING OF YOUR POSTGRES DATABASE"]
PG_SSL=["should use ssl to connect to your database value true|false"]
or
PG_HOST=["YOUR POSTGRES HOSt"]
PG_DATABASE=["YOUR POSTGRES database name"]
PG_USER=["YOUR POSTGRES user"]
PG_PASSWORD=["YOUR POSTGRES PASSWORD"]
```

```sh
cd image-uploader
npm i
node start
```


## License

MIT


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
