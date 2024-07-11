FROM node:20.14.0

RUN mkdir -p /app
WORKDIR /app
COPY . /app

RUN npm install -g pm2

EXPOSE 8080

CMD ["pm2","start","npm","--name","'solcast-frontend'","--","run","serve"]
