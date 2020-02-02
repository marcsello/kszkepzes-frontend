# Boilerplate
[eslint config setup guide](https://www.npmjs.com/package/eslint-config-airbnb)
## Run & Install
```bash
npm install

## or
yarn install

cp config.js.temp config.js

npm start
## or
yarn start
```

# Docker
```
sudo docker image build -t kszkepzes-frontend .
sudo docker container run --publish 3000:3000 --name kszkepzes-frontend kszkepzes-frontend
```

If you want to run in detached mode
```
sudo docker container run --publish 3000:3000 --detach --name kszkepzes-frontend kszkepzes-frontend
```

