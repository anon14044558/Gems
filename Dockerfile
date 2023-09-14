FROM node:16-alpine

RUN mkdir -p /nestjs
WORKDIR /nestjs

# Build
COPY ./src ./src
COPY ./nest-cli.json .
COPY ./tsconfig.build.json .
COPY ./tsconfig.json .
COPY package.json .

RUN yarn

RUN yarn run build

# Run
CMD ["node", "dist/main"]
