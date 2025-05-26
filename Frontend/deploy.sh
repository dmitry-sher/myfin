#!/bin/bash

rm -rf build
npm run build
cd build
tar -cjf deploy.tar.bz2 *
scp deploy.tar.bz2 sweb:/home/a/aperturesc/sherclub/public_html/myfin/
ssh sweb "cd /home/a/aperturesc/sherclub/public_html/myfin/ && rm -rf static index.html && tar -xjf deploy.tar.bz2 && rm deploy.tar.bz2"
