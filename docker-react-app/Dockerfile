FROM node:alpine as builder
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "run", "start"]

FROM nginx as runner
COPY --from=builder /usr/src/app/build /usr/share/nginx/html