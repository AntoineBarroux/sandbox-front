FROM node:20.15.1-alpine
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm ci
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
