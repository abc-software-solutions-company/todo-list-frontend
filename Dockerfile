FROM node:18-slim
WORKDIR /app
COPY . .
RUN yarn && yarn genfont && yarn build
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
EXPOSE 3000
ENV PORT 3000
CMD ["yarn", "start"]
