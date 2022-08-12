#build image
FROM node:16-alpine

RUN mkdir -p /flipclassroom/teachers
WORKDIR /flipclassroom/teachers