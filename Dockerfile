FROM node:16

RUN mkdir -p /home/app
COPY . /home/app
WORKDIR /home/app

CMD ["yarn","start:prod"]

