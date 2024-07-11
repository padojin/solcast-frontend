FROM node:20.14.0

RUN mkdir -p /app
WORKDIR /app
COPY . /app

#RUN npm install
RUN npm install -g pm2 pm2-runtime

EXPOSE 3000

CMD ["pm2-runtime","start","npm","--name","'solcast-frontend'","--","run","serve"]
