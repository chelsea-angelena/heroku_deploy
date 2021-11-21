FROM node:14-alpine3.13 as builder


ENV NODE_ENV build


WORKDIR /app


COPY . /app


RUN npm ci \
    && npm run build


# ---


FROM node:16.8-alpine3.11

ENV NODE_ENV development

ENV MODE=production


USER app
WORKDIR /app


COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/node_modules/ /app/node_modules/
COPY --from=builder /app/dist/ /app/dist/


CMD ["node", "dist/main.js"]