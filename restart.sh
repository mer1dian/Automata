#!/bin/bash

cd /var/www/discrete.gr/automata/

git pull
docker build -t automata .
docker kill automata
docker rm automata
docker run -p 9020:8080 -d --name automata automata