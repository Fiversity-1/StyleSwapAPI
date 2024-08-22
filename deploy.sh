#!/bin/bash

mkdir docker-cert
echo "${DOCKER_CA}" >docker-cert/ca.pem
echo "${DOCKER_KEY}" >docker-cert/key.pem
echo "${DOCKER_CERT}" >docker-cert/cert.pem

export DOCKER_CERT_PATH="$(pwd)/docker-cert"
export DOCKER_TLS_VERIFY=1

# Pull my docker images down
docker pull tablespoon/styleswapapi:latest
docker pull postgres

OLDCONTAINERS="$(docker ps -f label=user-repo-ci -q)"
# Runs the postgres database image
docker run -d \
    --name db \
    --label user-repo-ci \
    -p 80 -p 443 \
    --env POSTGRES_USER=${DB_USER} \
    --env POSTGRES_PASSWORD=${DB_PASSWORD} \
    --env POSTGRES_DATABASE=${DB_DATABASE}
postgres

# Runs the API image
docker run -d \
    --name api \
    --label user-repo-ci \
    -p 80 -p 443 \
    --env DB_USER=${DB_USER} \
    --env DB_PASSWORD=${DB_PASSWORD} \
    --env DB_DATABASE=${DB_DATABASE} \
    --env KEY=${KEY} \
    --env IV=${IV} \
    tablespoon/styleswapapi:latest
for x in $OLDCONTAINERS; do
    docker rm -f ${x}
done
