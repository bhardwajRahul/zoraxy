FROM docker.io/golang:alpine AS build

RUN mkdir -p /opt/zoraxy/source/ &&\
    mkdir -p /opt/zoraxy/config/ &&\
    mkdir -p /usr/local/bin/

RUN chmod -R 770 /opt/zoraxy/

# If you build it yourself, you will need to add the src directory into the docker directory.
COPY ./src/ /opt/zoraxy/source/

WORKDIR /opt/zoraxy/source/

RUN go mod tidy &&\
    go build -o /usr/local/bin/zoraxy &&\
    rm -r /opt/zoraxy/source/

RUN chmod 755 /usr/local/bin/zoraxy &&\
    chmod +x /usr/local/bin/zoraxy

FROM docker.io/alpine:latest

RUN apk add --no-cache bash netcat-openbsd sudo

COPY --from=build /usr/local/bin/zoraxy /usr/local/bin/zoraxy
COPY --from=build /opt/zoraxy/config/ /opt/zoraxy/config

VOLUME [ "/opt/zoraxy/config/" ]

WORKDIR /opt/zoraxy/config/

ENV AUTORENEW="86400"
ENV EARLYRENEW="30"
ENV FASTGEOIP="false"
ENV MDNS="true"
ENV MDNSNAME="''"
ENV NOAUTH="false"
ENV PORT="8000"
ENV SSHLB="false"
ENV VERSION="false"
ENV WEBFM="true"
ENV WEBROOT="./www"
ENV ZTAUTH="''"
ENV ZTPORT="9993"

ENTRYPOINT "zoraxy" "-docker=true" "-autorenew=${AUTORENEW}" "-earlyrenew=${EARLYRENEW}" "-fastgeoip=${FASTGEOIP}" "-mdns=${MDNS}" "-mdnsname=${MDNSNAME}" "-noauth=${NOAUTH}" "-port=:${PORT}" "-sshlb=${SSHLB}" "-version=${VERSION}" "-webfm=${WEBFM}" "-webroot=${WEBROOT}" "-ztauth=${ZTAUTH}" "-ztport=${ZTPORT}"

HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 CMD nc -vz 127.0.0.1 $PORT || exit 1
