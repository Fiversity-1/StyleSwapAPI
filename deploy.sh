#!/bin/bash

mkdir docker-cert
echo "${DOCKER_CA}" > docker-cert/ca.pem
echo "${DOCKER_KEY}" > docker-cert/key.pem
echo "${DOCKER_CERT}" > docker-cert/cert.pem

export DOCKER_CERT_PATH="$(pwd)/docker-cert"
export DOCKER_TLS_VERIFY=1

docker pull user/repo:latest
OLDCONTAINERS="$(docker ps -f label=user-repo-ci -q)"
docker run -d \
  --name thing \
  --label user-repo-ci \
  -p 80 -p 443 \
  user/repo:latest
for x in $OLDCONTAINERS; do
  docker rm -f ${x}
done
