FROM node:15

WORKDIR /app

COPY . .
RUN npm install

EXPOSE 5000
CMD ["npm", "run", "start"]
