FROM node:18-slim
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci --also=dev
RUN npm run build
RUN npm ci --production
RUN npm cache clean --force
ENV NODE_ENV="production"
ENV APP_ID=$APP_ID
ENV PRIVATE_KEY=$PRIVATE_KEY
COPY . .
CMD [ "npm", "start" ]
