FROM openjdk:8-jre
VOLUME ["/app"]
EXPOSE 8080
COPY  start.sh start.sh
RUN sh -c 'touch /app.jar'
ENTRYPOINT ["sh", "./start.sh"]
