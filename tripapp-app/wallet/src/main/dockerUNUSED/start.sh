#! /bin/bash
./wait-for-it.sh postgres:5432 -t 20
java -Djava.security.egd=file:/dev/./urandom -jar /app.jar
