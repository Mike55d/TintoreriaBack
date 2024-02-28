FROM node:16

RUN mkdir -p /home/app
COPY . /home/app
WORKDIR /home/app
RUN yarn
RUN npm install pm2 -g
RUN yarn build
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
