FROM node:10-alpine

WORKDIR /opt/app
ENV TZ Europe/Budapest
RUN apk add --no-cache tzdata && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Copying application files
COPY ./src ./src
COPY ./public ./public
COPY package.json yarn.lock package-lock.json ./

# Installing dependencies
RUN npm install 
RUN npm install serve
RUN yarn build

# Running
EXPOSE 3000
ENTRYPOINT ["npm", "run", "deploy"]

