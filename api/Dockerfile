FROM oven/bun

WORKDIR /app

# Environment variables for local
# These are filled in by secrets elsewhere
# So don't bother trying with these
ENV PORT="8080"
ENV DB_TYPE="postgres"
ENV DB_USER="postgres"
ENV DB_PASSWORD="postgres"
ENV DB_DATABASE="postgres"
ENV DB_PORT="5432"
ENV DB_HOST="db"

COPY ./package.json /app
COPY ./bun.lockb /app
COPY ./tsconfig.json /app

RUN bun install --frozen-lock-file

COPY ./src ./src

CMD [ "bun", "./src/index.ts"]
