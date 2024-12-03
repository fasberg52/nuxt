# Specify the base image with the desired Node.js version
ARG NODE_VERSION=20.18.0
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /src

FROM base AS build

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM base AS production

COPY --from=build /src/.output ./.output

EXPOSE 4001

ENV NODE_ENV=production

CMD ["node", ".output/server/index.mjs"]
