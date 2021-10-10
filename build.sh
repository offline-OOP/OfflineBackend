#!/bin/bash
docker login -u "$CI_REPOSITORY_NAME" -p "$CI_REPOSITORY_PASSWORD"
docker build -t "$APP_IMAGE" -f Dockerfile .
docker push "$APP_IMAGE"