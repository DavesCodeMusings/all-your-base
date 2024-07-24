FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 2101
CMD [ "node", "api.js" ]
