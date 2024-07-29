FROM oven/bun

WORKDIR /app

COPY ./package.json /app
COPY ./bun.lockb /app
COPY ./tsconfig.json /app

RUN bun install --frozen-lock-file

COPY ./src ./src

CMD [ "bun", "./src/index.ts"]
